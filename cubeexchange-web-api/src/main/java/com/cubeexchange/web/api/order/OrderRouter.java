package com.cubeexchange.web.api.order;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.*;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class OrderRouter {

    @Bean
    public RouterFunction<ServerResponse> orderRouterFunction(OrderHandler handler) {

        return RouterFunctions
                .nest(path("/api/order"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::order)
                        .andRoute(GET("/confirm/member").and(accept(TEXT_EVENT_STREAM)), handler::confirmMember)
                        .andRoute(GET("/confirm/public").and(accept(TEXT_EVENT_STREAM)), handler::confirm)
                        .andRoute(GET("/filled/public").and(accept(TEXT_EVENT_STREAM)), handler::filled)
//                        .andRoute(GET("/book").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::book)
                )
                ;
    }
}
