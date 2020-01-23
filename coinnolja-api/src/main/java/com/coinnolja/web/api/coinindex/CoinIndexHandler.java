package com.coinnolja.web.api.coinindex;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class CoinIndexHandler {

    private final CoinIndexService coinIndexService;

    public CoinIndexHandler(CoinIndexService coinIndexService) {
        this.coinIndexService = coinIndexService;
    }

    /**
     * GET Samples
     */
    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] CoinIndexHandler::findAll call [-----[ ");
//        Flux<CoinIndexList> indexFlux = coinIndexService.findAllIndex();
        return ServerResponse.ok().body(fromObject(coinIndexService.findAllIndex()))
                .switchIfEmpty(notFound().build());

    }

    public Mono<ServerResponse> findBySymbol(ServerRequest request) {
        log.info("]-----] CoinIndexHandler::findAll call [-----[ ");
        String symbol = request.pathVariable("symbol");
        Mono<ServerResponse> logOutStatus = ServerResponse.ok().body(fromObject(coinIndexService.makeCoinIndexPan(symbol)))
                .switchIfEmpty(notFound().build());

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> coinIndexService.makeCoinIndexPan(symbol, memberId))
                .flatMap(index -> ok().body(fromObject(index)))
                .switchIfEmpty(logOutStatus);


    }

}
