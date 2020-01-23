package com.cubeexchange.trade.common.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqConfig {

    public final static String queueNameOrder = "order.queue";
    public final static String exchangeNameOrder = "order.exchange";
//    public final static String queueNameFilled = "filled.queue." + RandomStringUtils.randomAlphabetic(10);

//    public final static String queueNameFilled = "filled.queue.1";
//    public final static String exchangeNameFilled = "filled.exchange";

    public final static String exchangeNameConfirm = "confirm.exchange";

    public final static String queueNameFilledReq = "filledReq.queue";
    public final static String exchangeFilledReq = "filledReq.exchange";

    public final static String queueNameFilled = "filled.queue";
    public final static String exchangeNameFilled = "filled.exchange";

    @Bean
    Queue queueFilldReq() {
        return new Queue(queueNameFilledReq, true, false, false);
    }

    @Bean
    DirectExchange exchangeFiiledReq() {
        return new DirectExchange(exchangeFilledReq);
    }

    @Bean
    Binding binding(Queue queueFilldReq, DirectExchange exchangeFiiledReq) {
        return BindingBuilder.bind(queueFilldReq).to(exchangeFiiledReq).with(queueNameFilledReq);
    }

//    @Bean
//    Queue queueFilled() {
//        return new Queue(queueNameFilled, false);
//    }
//    @Bean
//    FanoutExchange exchangeFilled() {
//        return new FanoutExchange(exchangeNameFilled);
//    }
//
//    @Bean
//    Binding bindingFilled(FanoutExchange exchangeFilled, Queue queueFilled) {
//        return BindingBuilder.bind(queueFilled).to(exchangeFilled);
//    }
//
//    @Bean
//    FanoutExchange exchangeConfirm() {
//        return new FanoutExchange(exchangeNameConfirm);
//    }


}
