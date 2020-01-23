package com.coinnolja.web.api.mediacollection;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class MediaCollectionRouter {

    @Bean
    public RouterFunction<ServerResponse> mediacollectionRouterFunction(MediaCollectionHandler handler) {

        return RouterFunctions
                .nest(path("/api/mediacollection"),
                        route(POST("").and(accept(MediaType.APPLICATION_JSON_UTF8)), handler::imgUploadSingle)

                );
    }
}
