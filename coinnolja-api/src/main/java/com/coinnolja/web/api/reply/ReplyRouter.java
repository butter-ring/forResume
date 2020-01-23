package com.coinnolja.web.api.reply;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class ReplyRouter {

    @Bean
    public RouterFunction<ServerResponse> replyRouterFunction(ReplyHandler handler) {

        return RouterFunctions
                .nest(path("/api/reply"),
                        route(GET("/{boardId}").and(accept(APPLICATION_JSON_UTF8)), handler::findAllAsc)
                                .andRoute(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::save)
                                .andRoute(POST("/edit").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::edit)
                )
                .andNest(path("/api/votereply"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::vote)
//                                .andRoute(DELETE("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::voteDelete)
                );
    }
}
