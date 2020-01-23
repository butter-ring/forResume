package com.cubeexchange.web.api.webSocket;


import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RabbitmqHandler {

//    private final Sender sender;
//    private final MemberRepository memberRepository;
//
//    public RabbitmqHandler(Sender sender, MemberRepository memberRepository) {
//        this.sender=sender;
//        this.memberRepository = memberRepository;
//    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
//    public Mono<ServerResponse> getOrder(ServerRequest request) {
//        log.info("]-----] ReactiveWebSocketHandler::getOrder call [-----[");
//        return request.principal()
//                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
//                .flatMap(memberId -> request.bodyToMono(OrderBook.class)
//                        .flatMap(orderBook -> {
//                            log.debug("]-----] ReactiveWebSocketHandler::getOrder orderBook [-----[ {}", orderBook);
//                            return Mono.just(sender.onSend(orderBook));
//                        }))
//                .flatMap(orderBook -> ok().body(fromObject(orderBook)))
//                .switchIfEmpty(notFound().build());
//    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
//    public Mono<ServerResponse> getOrder(ServerRequest request) {
//        log.info("]-----] ReactiveWebSocketHandler::getOrder call [-----[");
//        Mono<OrderBook> orderBookMono = request.bodyToMono(OrderBook.class);
//        return request.principal()
//                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
//                .flatMap(memberId -> orderBookMono.flatMap(orderBook -> {
//                    log.info("]-----] RabbitmqHandler::getOrder orderBook [-----[ {}", orderBook);
////                    Long id = orderBook.getUserId();
//                    if(!orderBook.getUserId().equals(memberId)) {
//                        return Mono.error(new MemberNotFoundException());
//                    }
//                    return Mono.just(sender.onSend(orderBook));
//                }))
//                .flatMap(orderBook -> ok().body(fromObject(orderBook)))
//                .switchIfEmpty(notFound().build());
//    }
}
