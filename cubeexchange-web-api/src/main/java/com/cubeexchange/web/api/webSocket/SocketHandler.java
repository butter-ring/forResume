package com.cubeexchange.web.api.webSocket;

import com.cubeexchange.web.api.order.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import java.io.IOException;
import java.util.Optional;

@Slf4j
public class SocketHandler implements WebSocketHandler {
    private UnicastProcessor<Order> messagePublisher;
    private Flux<String> outputMessages;
    private ObjectMapper mapper;

    public SocketHandler(UnicastProcessor<Order> messagePublisher, Flux<Order> messages) {
        this.messagePublisher = messagePublisher;
        this.mapper = new ObjectMapper();
        this.outputMessages = Flux.from(messages).map(this::toJSON);
    }


    @Override
    public Mono<Void> handle(WebSocketSession session) {
        WebSocketMessageSubscriber subscriber = new WebSocketMessageSubscriber(messagePublisher);
        log.debug("]-----] SocketHandler::handle messagePublisher [-----[ {}", messagePublisher);
        session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .map(this::toChatMessage)
                .subscribe(subscriber::onNext, subscriber::onError, subscriber::onComplete);
        log.debug("]-----] SocketHandler::handle textMessage [-----[ {}", outputMessages);
//        log.debug("]-----] ChatSocketHandler::handle outputMessages [-----[ {}", outputMessages.map(session::textMessage));
//        outputMessages.map(s -> {
//            log.debug("]-----] ChatSocketHandler::handle textMessage [-----[ {}", s);
//            return Mono.just(s);
//        }).subscribe();
        // 큐에서 받아 온 메세지 웹소캣을 통해 전송 만들기
        return session.send(outputMessages.map(session::textMessage));
    }

    private static class WebSocketMessageSubscriber {
        private UnicastProcessor<Order> messagePublisher;
        private Optional<Order> lastReceivedMessage = Optional.empty();

        public WebSocketMessageSubscriber(UnicastProcessor<Order> messagePublisher) {
            this.messagePublisher = messagePublisher;
            log.debug("]-----] ChatSocketHandler::WebSocketMessageSubscriber messagePublisher [-----[ {}", messagePublisher);
        }

        public void onNext(Order message) {
            log.debug("]-----] ChatSocketHandler::onNext message [-----[ {}", message);
            lastReceivedMessage = Optional.of(message);
            messagePublisher.onNext(message);
        }

        public void onError(Throwable error) {
            error.printStackTrace();
        }

        public void onComplete() {
            lastReceivedMessage.ifPresent(messagePublisher::onNext);
            log.debug("]-----] ChatSocketHandler::onComplete lastReceivedMessage [-----[ {}", lastReceivedMessage);
        }
    }


    private Order toChatMessage(String json) {
        try {
//            log.debug("]-----] ChatSocketHandler::toChatMessage outputMessages [-----[ {}", outputMessages.log());
            log.debug("]-----] ChatSocketHandler::toChatMessage json [-----[ {}", json);
            return mapper.readValue(json, Order.class);
        } catch (IOException e) {
            throw new RuntimeException("Invalid JSON:" + json, e);
        }
    }

    private String toJSON(Order message) {
        try {
            log.debug("]-----] ChatSocketHandler::toJSON message [-----[ {}", message);

            return mapper.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

}
