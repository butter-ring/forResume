package com.coinnolja.web.api.board;

import com.coinnolja.web.api.sample.SampleHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Slf4j
@Configuration
public class CategoryRouter {

    @Bean
    public RouterFunction<ServerResponse> categoryRouterFunction(CategoryHandler handler) {

        return RouterFunctions
                .nest(path("/api/category"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findAll)
                );
    }
}
