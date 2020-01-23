package com.cubeexchange.web.api.order;

import com.cubeexchange.web.api.common.config.RabbitmqConfig;
import com.cubeexchange.web.api.filled.FilledOrder;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OrderConsumer {
    private final OrderService orderService;

    public OrderConsumer(OrderService orderService) {
        this.orderService = orderService;

    }

    @RabbitListener(queues = {RabbitmqConfig.queueNameConfirm})
    public void receiveConfirm(String message) {

        log.debug("]-----] OrderConsumer::receiveConfirm message [-----[ {}", message);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            OrderConfirm confirmRecive = objectMapper.readValue(message, OrderConfirm.class);
            log.debug("]-----] confirmRecive [-----[ {}", confirmRecive);
            if (confirmRecive.getMessageCode() == 200000) {
//                orderService.addConfirm(confirmRecive);
                orderService.sendConfirmMember(confirmRecive);
//                orderService.sendConfirmMember(confirmRecive);
            } else {
//                orderService.addConfirmError(confirmRecive);
                orderService.sendConfirmMember(confirmRecive);

            }
        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }

    }

    @RabbitListener(queues = {RabbitmqConfig.queueNameFilled})
    public void receiveFilled(String message) {

        log.debug("]-----] OrderConsumer::receiveFilled message [-----[ {}", message);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            FilledOrder filledRecive = objectMapper.readValue(message, FilledOrder.class);
            log.debug("]-----] receiveFilled [-----[ {}", filledRecive);
            orderService.sendFilled(filledRecive);

        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }

    }
}