package com.coinnolja.web.api.search;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class SearchRouter {

    @Bean
    public RouterFunction<ServerResponse> searchRouterFunction(SearchHandler handler) {

        return RouterFunctions
                .nest(path("/api/search"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findAll)
                                .andRoute(GET("/rank").and(accept(APPLICATION_JSON_UTF8)), handler::findRank)
                )
                ;
    }
}
