package com.coinnolja.web.api.judge;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class JudgeRouter {

    @Bean
    public RouterFunction<ServerResponse> judgeRouterFunction(JudgeHandler handler) {

        return RouterFunctions
                .nest(path("/api/judge"),
                        route(POST("/board").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::boardJudge)
                                .andRoute(POST("/reply").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::replyJudge)
                )
                ;
    }
}
