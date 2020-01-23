package com.cubeexchange.web.api.rabbitmq;

import com.cubeexchange.web.api.common.config.RabbitmqConfig;
import com.cubeexchange.web.api.order.Order;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MessageProducerTest {
    public static Logger log = LoggerFactory.getLogger(MessageProducerTest.class);

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void sendMessage() throws Exception {
        Order order = new Order();
        order.setCurrency("ETH");
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonPush = objectMapper.writeValueAsString(order);
        log.debug(jsonPush);
        rabbitTemplate.convertAndSend(RabbitmqConfig.queueNameOrder, jsonPush);
    }
}