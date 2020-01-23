package com.cubeexchange.web.api.common.config;

import com.cubeexchange.web.api.order.Order;
import com.cubeexchange.web.api.webSocket.ReactiveWebSocketHandler;
import com.cubeexchange.web.api.webSocket.SocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.WebSocketService;
import org.springframework.web.reactive.socket.server.support.HandshakeWebSocketService;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.reactive.socket.server.upgrade.ReactorNettyRequestUpgradeStrategy;
import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ReactiveWebSocketConfiguration {

    @Autowired
    @Qualifier("ReactiveWebSocketHandler")
    private WebSocketHandler webSocketHandler;

    @Bean
    public HandlerMapping webSocketHandlerMapping(
            UnicastProcessor<Order> messagePublisher
            , Flux<Order> messages
    ) {
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/event-emitter", new ReactiveWebSocketHandler());
        map.put("/websocket/order", new SocketHandler(messagePublisher, messages));

        SimpleUrlHandlerMapping handlerMapping = new SimpleUrlHandlerMapping();
        handlerMapping.setUrlMap(map);
        handlerMapping.setOrder(-1);
        return handlerMapping;
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }

    @Bean
    public WebSocketService webSocketService() {
        return new HandshakeWebSocketService(new ReactorNettyRequestUpgradeStrategy());
    }


    @Bean
    public UnicastProcessor<Order> messagePublisher() {
        return UnicastProcessor.create();
    }

    @Bean
    public Flux<Order> messages(UnicastProcessor<Order> messagePublisher) {
        return messagePublisher
                .replay(10)
                .autoConnect();
    }


}
