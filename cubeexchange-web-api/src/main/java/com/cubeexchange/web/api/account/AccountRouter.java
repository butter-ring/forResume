package com.cubeexchange.web.api.account;

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
public class AccountRouter {

    @Bean
    public RouterFunction<ServerResponse> accountRouterFunction(AccountHandler handler) {
        return RouterFunctions
                .nest(path("/api/account"),
                        route(GET("/{currency}").and(accept(APPLICATION_JSON_UTF8)), handler::findByCurrency)
                );
    }
}
