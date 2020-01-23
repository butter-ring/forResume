package com.cubeexchange.web.api.sse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.time.LocalTime;

@Service
@Slf4j
public class SseService {

    // @EventListener(ApplicationReadyEvent.class)
    public Flux<String> consumeServerSentEvent() {

        return WebClient.create("http://localhost:8080/sse-server")
                .get()
                .retrieve()
                .bodyToFlux(String.class);
    }
//        WebClient client = WebClient.create("http://localhost:8080/sse-server");
//        ParameterizedTypeReference<ServerSentEvent<String>> type
//                = new ParameterizedTypeReference<ServerSentEvent<String>>() {};
//
//        Flux<ServerSentEvent<String>> eventStream = client.get()
//                .uri("/api/order")
//                .retrieve()
//                .bodyToFlux(type);
//
//        eventStream.subscribe(
//                content -> log.info("Time: {} - event: name[{}], id [{}], content[{}] ",
//                        LocalTime.now(), content.event(), content.id(), content.data()),
//                error -> log.error("Error receiving SSE: {}", error),
//                () -> log.info("Completed!!!"));
//    }
}
