package com.cubeexchange.web.api.coingecko;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Slf4j
@Configuration
public class CoingeckoRouter {

    @Bean
    public RouterFunction<ServerResponse> coingeckoRouterFunction(CoingeckoHandler handler) {
        return RouterFunctions
                .nest(path("/api/coinmarket"),
                        route(GET("/{currency}").and(accept(MediaType.APPLICATION_JSON_UTF8)), handler::findAllByCurrency)

                );
    }
}
