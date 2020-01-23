package com.cubeexchange.web.api.order;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class OrderBookHandler {

    private final OrderBookService orderBookService;

    public OrderBookHandler(OrderBookService orderBookService) {
        this.orderBookService = orderBookService;
    }


    public Mono<ServerResponse> orderBook(ServerRequest request) {
        log.info("]-----] OrderBookHandler::orderBook call [-----[ ");

        String symbol = request.pathVariable("symbol");
        return orderBookService.orderBook(symbol)
                .flatMap(orderBook -> ok().body(fromObject(orderBook)))
                .switchIfEmpty(notFound().build());

    }

}
