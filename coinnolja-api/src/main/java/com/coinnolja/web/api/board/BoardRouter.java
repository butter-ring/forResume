package com.coinnolja.web.api.board;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class BoardRouter {

    @Bean
    public RouterFunction<ServerResponse> boardRouterFunction(BoardHandler handler) {

        return RouterFunctions
                .nest(path("/api/board"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findAll)
                                .andRoute(GET("/{id}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::save)
                                .andRoute(POST("/put/{id}").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::put)

                )
                .andNest(path("/api/vote"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::vote)
//                                .andRoute(DELETE("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::voteDelete)
                )
                .andNest(path("/api/boardmaster"),
                        route(GET("/{id}").and(accept(APPLICATION_JSON_UTF8)), handler::findBoardMasterById)

                )
                .andNest(path("/api/boardrank"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findRank)

                )
                .andNest(path("/api/top/{boardMasterId}"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findTop)

                )

                ;
    }
}
