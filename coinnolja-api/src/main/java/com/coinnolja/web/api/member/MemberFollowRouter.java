package com.coinnolja.web.api.member;

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
public class MemberFollowRouter {

    @Bean
    public RouterFunction<ServerResponse> memberFollowRouterFunction(MemberFollowHandler handler) {

        return RouterFunctions
                // 친구 확인,등록,삭제
                .nest(path("/api/follow"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::follow)
                                .andRoute(POST("/save").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::followSave)
                                .andRoute(POST("/del").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::followDelete)
                )
                // 마이페이지 밑의 내 친구 목록
                .andNest(path("/api/followlist"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::followList)
                )
                ;

    }
}
