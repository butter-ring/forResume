package com.cubeexchange.trade.filled;

import com.cubeexchange.trade.common.config.RabbitmqConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FilledConsumer {

    private final RabbitTemplate rabbitTemplate;
    private final FilledService filledService;

    public FilledConsumer(RabbitTemplate rabbitTemplate, FilledService filledService) {
        this.rabbitTemplate = rabbitTemplate;

        this.filledService = filledService;
    }

    @RabbitListener(queues = {RabbitmqConfig.queueNameFilledReq})
    public void receiveOutstanding(String outstandingId) {

        log.debug("]-----] outstandingId [-----[ {}", outstandingId);


        try {
            filledService.filled(Long.parseLong(outstandingId));

        } catch (Exception ex) {

            log.error("]-----] OrderConsumer::error readValue [-----[ {}", ex);
        }

    }

}