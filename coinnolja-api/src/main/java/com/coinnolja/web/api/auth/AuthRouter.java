package com.coinnolja.web.api.auth;

import com.coinnolja.web.api.member.MemberHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.path;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
@Slf4j
@Configuration
public class AuthRouter {


    @Bean
    public RouterFunction<ServerResponse> authRouterFunction(AuthHandler handler) {
        return RouterFunctions
                .nest(path("/auth"),
                        route(GET("/signin"), handler::signIn)
                );
    }


}
