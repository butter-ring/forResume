package com.cubeexchange.web.api.order;

import com.cubeexchange.web.api.common.config.RabbitmqConfig;
import com.cubeexchange.web.api.filled.FilledOrder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.TEXT_EVENT_STREAM;
import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class OrderHandler {

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;
    private final OrderService orderService;

    public OrderHandler(RabbitTemplate rabbitTemplate, OrderService orderService) {
        this.rabbitTemplate = rabbitTemplate;
        this.orderService = orderService;
        this.objectMapper = new ObjectMapper();
    }


    @Autowired
    private DirectExchange directExchange;


    /**
     * POST a Sample
     */
    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    public Mono<ServerResponse> order(ServerRequest request) {
        log.info("]-----] OrderHandler::order call [-----[ ");

        return
                request.principal()
                        .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                        .flatMap(memberId ->
                                request.bodyToMono(Order.class)
                                        .flatMap(order -> {
                                            try {
                                                log.info("]-----] OrderHandler::order order [-----[ {}", order);
                                                order.setMemberId(memberId);
                                                String jsonOrder = objectMapper.writeValueAsString(order);
                                                log.info("]-----] OrderHandler::order jsonOrder [-----[ {}", jsonOrder);
                                                log.info("]-----] OrderHandler::order fanout [-----[ {}", directExchange.getName());
                                                rabbitTemplate.convertAndSend(RabbitmqConfig.queueNameOrder, jsonOrder);
                                                return Mono.just(1);
                                            } catch (JsonProcessingException e) {
                                                e.printStackTrace();
                                                return Mono.just(0);
                                            }
                                        })
                        )
                        .flatMap(order -> ok().body(fromObject(order)))
                        .switchIfEmpty(notFound().build());

    }


    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    public Mono<ServerResponse> confirmMember(ServerRequest request) {
        log.info("]-----] OrderHandler::confirmMember call [-----[ ");


        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(orderService.getConfirmMember(memberId)))
                .flatMap(orderConfirm -> ok().contentType(TEXT_EVENT_STREAM).body(orderConfirm, OrderConfirm.class))
                .switchIfEmpty(notFound().build());

    }


    public Mono<ServerResponse> confirm(ServerRequest request) {
        log.info("]-----] OrderHandler::confirm call [-----[ ");

        return Mono.just(orderService.getConfirm())
                .flatMap(orderConfirm -> ok().contentType(TEXT_EVENT_STREAM).body(orderConfirm, OrderConfirm.class))
                .switchIfEmpty(notFound().build());

    }

    public Mono<ServerResponse> filled(ServerRequest request) {
        log.info("]-----] OrderHandler::filled call [-----[ ");
        return Mono.just(orderService.getFilled())
                .flatMap(filled -> ok().contentType(TEXT_EVENT_STREAM).body(filled, FilledOrder.class))
                .switchIfEmpty(notFound().build());
    }


}
