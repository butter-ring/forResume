package com.cubeexchange.web.api.rabbitmq;

import com.cubeexchange.web.api.CubeexchangeWebApiApplication;
import org.junit.Test;
// import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("local")
public class rabbitmqTest {


    @Test
    public void sendMessageTest() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate();
        CachingConnectionFactory factory = new CachingConnectionFactory("192.168.56.101", 5672);
        factory.setUsername("rabbitmq");
        factory.setPassword("0909");
        SampleMessage message = new SampleMessage();
        message.setName("smsService");
        message.setContent("test content!!!!!");
        rabbitTemplate.setExchange("test-queue-1-exchange");
        rabbitTemplate.setQueue("test-queue-1");
        rabbitTemplate.convertAndSend(message);

    }

}
