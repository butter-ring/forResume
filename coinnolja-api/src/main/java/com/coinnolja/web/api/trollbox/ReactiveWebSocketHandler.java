package com.coinnolja.web.api.trollbox;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

import static java.util.UUID.randomUUID;
import static java.time.LocalDateTime.now;

@Slf4j
@Component("ReactiveWebSocketHandler")
public class ReactiveWebSocketHandler implements WebSocketHandler {

    private static final ObjectMapper json = new ObjectMapper();

    private Flux<String> eventFlux = Flux.generate(sink -> {
        Event event = new Event(randomUUID().toString(), now().toString());
        try {
            sink.next(json.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            sink.error(e);
        }
    });

    private Flux<String> intervalFlux = Flux.interval(Duration.ofMillis(3000L))
            .zipWith(eventFlux, (time, event) -> event);

    @Override
    public Mono<Void> handle(WebSocketSession webSocketSession) {
//        return webSocketSession
//                .send(webSocketSession.receive()
//                        .map(msg -> "RECEIVED ON SERVER :: " + msg.getPayloadAsText())
//                        .map(webSocketSession::textMessage)
//                );
        log.debug("]-----] ReactiveWebSocketHandler::handle webSocketSession [-----[ {}", webSocketSession);
        return webSocketSession
//                .send(intervalFlux.map(webSocketSession::textMessage))
                .send(webSocketSession.receive().map(WebSocketMessage::getPayloadAsText).map(webSocketSession::textMessage));
    }
}
