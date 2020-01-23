package com.cubeexchange.web.api.common.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqConfig {

    public final static String queueNameOrder = "order.queue";
    public final static String exchangeNameOrder = "order.exchange";

    public final static String queueNameFilled = "filled.queue";
    public final static String exchangeNameFilled = "filled.exchange";

    public final static String queueNameConfirm = "confirm.queue";
    public final static String exchangeNameConfirm = "confirm.exchange";


    @Bean
    Queue queueOrder() {
        return new Queue(queueNameOrder, true, false, false);
    }

    @Bean
    DirectExchange exchangeOrder() {
        return new DirectExchange(exchangeNameOrder);
    }

    @Bean
    Binding binding(Queue queueOrder, DirectExchange exchangeOrder) {
        return BindingBuilder.bind(queueOrder).to(exchangeOrder).with(queueNameOrder);
    }

    @Bean
    Queue queueFilled() {
        return new Queue(queueNameFilled, false);
    }
    @Bean
    FanoutExchange exchangeFilled() {
        return new FanoutExchange(exchangeNameFilled);
    }
    @Bean
    Binding bindingFilled(FanoutExchange exchangeFilled, Queue queueFilled) {
        return BindingBuilder.bind(queueFilled).to(exchangeFilled);
    }


    @Bean
    Queue queueConfirm() {
        return new Queue(queueNameConfirm, false);
    }

    @Bean
    FanoutExchange exchangeConfirm() {
        return new FanoutExchange(exchangeNameConfirm);
    }

    @Bean
    Binding bindingConfirm(FanoutExchange exchangeConfirm, Queue queueConfirm) {
        return BindingBuilder.bind(queueConfirm).to(exchangeConfirm);
    }


//    @Bean
//    SimpleMessageListenerContainer container(
//            ConnectionFactory connectionFactory
//    ) {
//        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        container.setQueueNames(queueName);
////        container.setMessageListener(listenerAdapter);
//        return container;
//    }


}
