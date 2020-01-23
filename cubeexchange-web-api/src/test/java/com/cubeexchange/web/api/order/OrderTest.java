package com.cubeexchange.web.api.order;

import com.cubeexchange.web.api.CubeexchangeWebApiApplicationTests;
import com.cubeexchange.web.api.order.constants.OrderPosition;
import com.cubeexchange.web.api.order.constants.OrderStatus;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

@ActiveProfiles("local")
public class OrderTest extends CubeexchangeWebApiApplicationTests {
    public static Logger log = LoggerFactory.getLogger(OrderTest.class);

    @Test
    public void Order(){
        Order order = new Order();
        order.setMemberId(1L);
        order.setAccountType("acccountType");
        order.setAmount(new BigDecimal(1000));
        order.setAmount(new BigDecimal(1));
        order.setCurrency("KRW");
        order.setFee(new BigDecimal(2));
        order.setFeeRate(new BigDecimal(3));
        order.setOrderStatus(OrderStatus.NEW);
        order.setOrderVolume(BigDecimal.valueOf(1));
        order.setOrderPosition(OrderPosition.BUY);
    }
}
