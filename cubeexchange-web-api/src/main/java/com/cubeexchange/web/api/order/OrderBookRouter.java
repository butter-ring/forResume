package com.cubeexchange.web.api.order;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class OrderBookRouter {

    @Bean
    public RouterFunction<ServerResponse> orderBookRouterFunction(OrderBookHandler handler) {

        return RouterFunctions
                .nest(path("/api/orderbook/{symbol}"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::orderBook)

                )
                ;
    }
}
