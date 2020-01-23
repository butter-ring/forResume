package com.cubeexchange.trade.order;

import com.cubeexchange.trade.common.config.RabbitmqConfig;
import com.cubeexchange.trade.common.exception.CnException;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import com.cubeexchange.trade.order.constants.OrderMessagerCode;
import com.cubeexchange.trade.order.constants.OrderStatus;
import com.cubeexchange.trade.order.exception.OrderVaildException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OrderConsumer {

    private final RabbitTemplate rabbitTemplate;
    private final OrderService orderService;

    public OrderConsumer(RabbitTemplate rabbitTemplate, OrderService orderService) {
        this.rabbitTemplate = rabbitTemplate;
        this.orderService = orderService;
    }

    @RabbitListener(queues = {RabbitmqConfig.queueNameOrder})
    public void receiveOrder(String orderRecive) {

        log.debug("]-----] orderRecive [-----[ {}", orderRecive);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Order newOrder = objectMapper.readValue(orderRecive, Order.class);
            log.debug("]-----] newOrder [-----[ {}", newOrder);

            try {
                if (newOrder.getOrderStatus() == OrderStatus.CANCEL) {
                    //TODO : order cancel
                } else if (newOrder.getOrderStatus() == OrderStatus.NEW) {
//                    throw new OrderVaildException(ErrorMessagerCode.ORDER_STATUS_NOT_ACCEPTABLE);
                    OrderOutstanding orderOutstanding = orderService.newOrder(newOrder);
                    OrderConfirm orderConfirm = new OrderConfirm();
                    orderConfirm.setMemberId(newOrder.getMemberId());
                    orderConfirm.setOrder(newOrder);
                    orderConfirm.setMessage(OrderMessagerCode.ORDER_COMPLETE.name());
                    orderConfirm.setMessageCode(OrderMessagerCode.ORDER_COMPLETE.getCode());
                    String sendData = objectMapper.writeValueAsString(orderConfirm);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameConfirm, "", sendData);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.queueNameFilledReq,  orderOutstanding.getId());
                } else {
                    throw new OrderVaildException(ErrorMessagerCode.ORDER_STATUS_NOT_ACCEPTABLE);
                }

            } catch (Exception ex) {
                if (ex instanceof CnException) {
                    CnException cnException = (CnException) ex;
                    log.debug("]-----] 11UserExceptionHandler::handle httpStatus [-----[ {}", cnException.getHttpStatus());
                    log.debug("]-----] 11UserExceptionHandler::handle cnException [-----[ {}", cnException.getErrorMessagerCode());
                    OrderConfirm orderConfirm = new OrderConfirm();
                    orderConfirm.setMemberId(newOrder.getMemberId());
                    orderConfirm.setOrder(newOrder);
                    orderConfirm.setMessage(cnException.getErrorMessagerCode().name());
                    orderConfirm.setMessageCode(cnException.getErrorMessagerCode().getCode());
                    String sendData = objectMapper.writeValueAsString(orderConfirm);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameConfirm, "", sendData);

                }
                log.error("]-----] error [-----[ {}", ex);
            }


        } catch (Exception ex) {

            log.error("]-----] OrderConsumer::error readValue [-----[ {}", ex);
        }

    }

//    @RabbitListener(queues = {RabbitmqConfig.queueNameFilled})
//    public void receiveFilled(String message) {
//
//        log.debug("aaaa Received Message: " + message);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            Order orderRecive = objectMapper.readValue(message, Order.class);
//            log.debug("]-----] orderRecive [-----[ {}", orderRecive);
//        } catch (Exception e) {
//            log.error("]-----] error [-----[ {}", e);
//        }
//
//    }
}