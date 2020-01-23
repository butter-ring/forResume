package com.cubeexchange.web.api.coingecko;

import com.cubeexchange.web.api.coingecko.constant.Currency;
import io.netty.channel.ChannelOption;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Slf4j
@Component
public class CoingeckoHandler {
    private static final String MIME_TYPE = "application/json";
    private final String API_BASE_URL = "https://api.coingecko.com/api/v3/";

    private static final HttpClient httpClient = HttpClient.create()
            .tcpConfiguration(client ->
                    client.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000));

    private final WebClient webClient;

    public CoingeckoHandler(){
        this.webClient = WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(API_BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MIME_TYPE)
                .build();
    }
//    ServerResponse.ok().body(fromObject(coingeckoService.getCoinMarkets(Currency.USD)))
//            .switchIfEmpty(notFound().build());

//    public Mono<ServerResponse> findAll(ServerRequest request) {
//        log.info("]-----] CoingeckoHandler::findAll call [-----[ ");
//
//        return ServerResponse.ok().body(fromObject(coingeckoService.getCoinMarkets(Currency.KRW)))
//                .switchIfEmpty(notFound().build());
//
//    }
//    .flatMapMany(clientResponse -> clientResponse.bodyToFlux(CoinMarkets.class))

//    public Mono<ServerResponse> findAll(ServerRequest request) {
//
//        return ServerResponse.ok().body(fromObject(
//                webClient.get()
//                    .uri(uriBuilder -> uriBuilder.path("/coins/markets")
//                        .queryParam("vs_currency", Currency.KRW).build())
//                        .exchange()
//                        .flatMapMany(clientResponse -> clientResponse.bodyToFlux(CoinMarkets.class))))
//                .switchIfEmpty(notFound().build());
//    }

//    public Mono<ServerResponse> findAll(ServerRequest request) {
//        return webClient.get().uri(uriBuilder -> uriBuilder.path("/coins/markets").queryParam("vs_currency", Currency.KRW).build())
//                .exchange()
//                .flatMap(clientResponse -> clientResponse.toEntityList(CoinMarkets.class))
//                .flatMap(coinMarkets -> ok().body(fromObject(coinMarkets)))
//                .switchIfEmpty(notFound().build());
//    }


    public Mono<ServerResponse> findAllByCurrency(ServerRequest request) {
        String currency = request.pathVariable("currency");
        log.debug("]-----] CoingeckoHandler::findAllByCurrency.member [-----[ {}", currency);
        return webClient.get().uri(uriBuilder -> uriBuilder.path("/coins/markets").queryParam("vs_currency", currency).queryParam("per_page", 20).build())
                .exchange()
                .flatMap(clientResponse -> clientResponse.toEntityList(CoinMarkets.class))
                .flatMap(coinMarkets -> ok().body(fromObject(coinMarkets)))
                .switchIfEmpty(notFound().build());
    }
}
