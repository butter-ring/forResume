package com.cubeexchange.trade.order;

import com.cubeexchange.trade.TradeApplicationTests;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import com.cubeexchange.trade.order.constants.OrderStatus;
import com.cubeexchange.trade.order.exception.OrderVaildException;
import org.junit.Test;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

@ActiveProfiles("local")
public class OrderServiceTest extends TradeApplicationTests {

    @Test
    public void bigdecimalTest() {
        log.debug("]-----][-----[ {}", BigDecimal.ONE.compareTo(BigDecimal.ZERO));
        log.debug("]-----][-----[ {}", BigDecimal.ONE.compareTo(BigDecimal.TEN));
        log.debug("]-----][-----[ {}", BigDecimal.ONE.compareTo(BigDecimal.ONE));
        BigDecimal totalAmount = new BigDecimal("0.000100100000");
        BigDecimal availableBalance = new BigDecimal("10.000080000000");
        log.debug("]-----][-----[ {}", totalAmount.compareTo(availableBalance));
        log.debug("]-----][-----[ {}", availableBalance.compareTo(totalAmount));


    }

    @Test
    public void enumTest() {
        Order order = new Order();
        order.setOrderStatus(OrderStatus.CANCEL);
        if (order.getOrderStatus() == OrderStatus.CANCEL) {
            log.debug("]-----][-----[ {}", BigDecimal.ONE.compareTo(BigDecimal.ZERO));
        }


    }

    @Test
    public void recursiveTest() {
        int result = tailSum(10);
        log.debug("]-----] result [-----[ {}", result);
    }


    public int tailSum(int n) {
        log.debug("]-----] currentSum [-----[ {}", n);
        if (n <= 1) {
            return n;
        }
        return tailSum(n - 1);
    }


}