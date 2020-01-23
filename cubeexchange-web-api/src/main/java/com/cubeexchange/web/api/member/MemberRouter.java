package com.cubeexchange.web.api.member;

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
public class MemberRouter {

    @Bean
    public RouterFunction<ServerResponse> memberRouterFunction(MemberHandler handler) {

        return RouterFunctions
                .nest(path("/api/member"),
                        route(GET("/{memberId}").and(contentType(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(POST("/validemail").and(accept(APPLICATION_JSON_UTF8)), handler::validemail)
                )
                .andNest(path("/api/signup"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::signup)
                )
                                // .andRoute(POST("/dup").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::signupDup)
                .andNest(path("/api/account"),
                        route(GET("/{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::getMemberInfo)
                                // .andRoute(GET("/asset"), handler::getMemberAccount)
                                .andRoute(POST("/updateinfo").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::updateMyInfo)
                                .andRoute(POST("/checkpassword").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::checkPassword)
                                .andRoute(POST("/updatepassword").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::updatePassword)
                                .andRoute(POST("/dup").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::signupDup)
                                .andRoute(POST("/emailauth"), handler::emailAuth)
                )
                .andNest(path("/api/wallet"),
                        route(GET("/generate"), handler::generatewallet)
                                .andRoute(GET("/asset").and(accept(APPLICATION_JSON_UTF8)), handler::getMemberAccount)
                )
                .andNest(path("/api/otp"),
                        route(GET(""), handler::otp)
                                .andRoute(POST("/otpcheck"), handler::otpcheck)
                );

    }
}
