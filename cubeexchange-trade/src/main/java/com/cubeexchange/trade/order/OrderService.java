package com.cubeexchange.trade.order;

import com.cubeexchange.trade.account.Account;
import com.cubeexchange.trade.account.AccountRepository;
import com.cubeexchange.trade.commodity.Commodity;
import com.cubeexchange.trade.commodity.CommodityRepository;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import com.cubeexchange.trade.order.constants.OrderPosition;
import com.cubeexchange.trade.order.exception.AccountVaildException;
import com.cubeexchange.trade.order.exception.CommodityVaildException;
import com.cubeexchange.trade.order.exception.MemberVaildException;
import com.cubeexchange.trade.order.exception.OrderVaildException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderOutstandingRepository orderOutstandingRepository;
    private final AccountRepository accountRepository;
    private final CommodityRepository commodityRepository;

    public OrderService(
            OrderRepository orderRepository
            , OrderOutstandingRepository orderOutstandingRepository
            , AccountRepository accountRepository
            , CommodityRepository commodityRepository
    ) {
        this.orderRepository = orderRepository;
        this.orderOutstandingRepository = orderOutstandingRepository;
        this.accountRepository = accountRepository;
        this.commodityRepository = commodityRepository;
    }

    @Transactional
    public OrderOutstanding newOrder(Order order) {
        orderValid(order);
        commodityValid(order);
        Order orderValided =  null;
        if (order.getOrderPosition() == OrderPosition.BUY) {
            orderValided = accountValid(order);
        } else if (order.getOrderPosition() == OrderPosition.SELL) {
            orderValided = accountValidSell(order);
        } else {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_POSITION_NOT_ACCEPTABLE);
        }

        log.debug("]-----] OrderService::receiveOrder.orderValided [-----[ {}", orderValided);
        orderRepository.save(orderValided);
        if (order.getOrderPosition() == OrderPosition.BUY) {
            accountRepository.updateBalanceByMemberIdAndCurrency(orderValided.getAmount().multiply(new BigDecimal(-1)), order.getMemberId(), order.getCurrency());
        } else if (order.getOrderPosition() == OrderPosition.SELL) {
            accountRepository.updateBalanceByMemberIdAndCurrency(orderValided.getAmount().multiply(new BigDecimal(-1)), order.getMemberId(), order.getSymbol());
        } else {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_POSITION_NOT_ACCEPTABLE);
        }

        OrderOutstanding orderOutstanding = new OrderOutstanding();
        orderOutstanding.setOrderId(orderValided.getId());
        orderOutstanding.setOutstandingVolume(orderValided.getOrderVolume());
        orderOutstanding.setOrderPrice(orderValided.getOrderPrice());
        orderOutstanding.setOrderPosition(orderValided.getOrderPosition());
        orderOutstanding.setFilled(false);
        orderOutstanding.setSymbol(orderValided.getSymbol());
        orderOutstanding.setCurrency(orderValided.getCurrency());
        orderOutstanding.setMemberId(orderValided.getMemberId());
        orderOutstandingRepository.save(orderOutstanding);
        return orderOutstanding;
    }

    public Order orderValid(Order order) throws DataAccessException {
        log.debug("]-----] OrderService::save.order [-----[ {}", order);
        //주문자
        if (order.getMemberId() == null) {
            throw new MemberVaildException(ErrorMessagerCode.MEMBERID_IS_EMPTY);
        }
        if (StringUtils.isBlank(order.getSymbol())) {
            throw new OrderVaildException(ErrorMessagerCode.SYMBOL_IS_EMPTY);
        }
        if (StringUtils.isBlank(order.getSymbol())) {
            throw new OrderVaildException(ErrorMessagerCode.SYMBOL_IS_EMPTY);
        }
        if (StringUtils.isBlank(order.getCurrency())) {
            throw new OrderVaildException(ErrorMessagerCode.CURRENCY_IS_EMPTY);
        }
        if (order.getOrderPrice() == null) {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_PRICE_NOT_ACCEPTABLE);
        }
        if (order.getOrderPrice().compareTo(BigDecimal.ZERO) < 1) {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_PRICE_NOT_ACCEPTABLE);
        }
        if (order.getOrderVolume() == null) {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_VOLUME_NOT_ACCEPTABLE);
        }
        if (order.getOrderVolume().compareTo(BigDecimal.ZERO) < 1) {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_VOLUME_NOT_ACCEPTABLE);
        }
        return order;
    }

    public Commodity commodityValid(Order order) {
        String symbol = order.getSymbol();
        Commodity commodity = commodityRepository.findBySymbolAndActive(symbol, 1);
        if (commodity == null) {
            throw new CommodityVaildException(ErrorMessagerCode.COMMODITY_NOT_FOUND);
        }
        if (commodity.getTradeState() != 1) {
            throw new CommodityVaildException(ErrorMessagerCode.COMMODITY_NOT_AVAILABLE);
        }

        return commodity;
    }

    public Order accountValid(Order order) {
        Account account = accountRepository.findByMemberIdAndCurrencyAndActive(order.getMemberId(), order.getCurrency(), 1);
        if (account == null) {
            throw new AccountVaildException(ErrorMessagerCode.ACCOUNT_NOT_FOUND);
        }
        BigDecimal orderFee = BigDecimal.ZERO;
        BigDecimal feeRate = BigDecimal.ZERO;
        BigDecimal availableBalance = account.getAvailableBalance();
        BigDecimal orderAmount = order.getOrderPrice().multiply(order.getOrderVolume()).setScale(12, RoundingMode.UP);
        /** 거래소 손해를 방지하기 위해서 taker fee로 계산한다 */
        feeRate = account.getTakerFeeRate().divide(new BigDecimal(100)).setScale(12, RoundingMode.UP);
        orderFee = orderAmount.multiply(feeRate).setScale(12, RoundingMode.UP);
        BigDecimal totalAmount = orderAmount.add(orderFee);
        log.debug("]-----] OrderService::accountValid.totalAmount [-----[ {}", totalAmount);
        log.debug("]-----] OrderService::accountValid.availableBalance [-----[ {}", availableBalance);
        if (totalAmount.compareTo(availableBalance) > 0) {
            throw new OrderVaildException(ErrorMessagerCode.AVAILABLE_BALANCE_NOT_ENOUGH);
        }
        order.setFee(orderFee);
        order.setFeeRate(feeRate);
        order.setAmount(totalAmount);
        order.setFilledPrice(BigDecimal.ZERO);
        order.setFilledVolume(BigDecimal.ZERO);
        order.setFilled(false);
        return order;
    }

    public Order accountValidSell(Order order) {
        Account account = accountRepository.findByMemberIdAndCurrencyAndActive(order.getMemberId(), order.getSymbol(), 1);
        if (account == null) {
            throw new AccountVaildException(ErrorMessagerCode.ACCOUNT_NOT_FOUND);
        }
        BigDecimal orderFee = BigDecimal.ZERO;
        BigDecimal feeRate = BigDecimal.ZERO;
        BigDecimal availableBalance = account.getAvailableBalance();
        /** 수수료는 기준통화 지급시 제하기때문에 수량만 체크 */
        feeRate = account.getTakerFeeRate().divide(new BigDecimal(100)).setScale(12, RoundingMode.UP);

        BigDecimal orderAmount = order.getOrderPrice().multiply(order.getOrderVolume()).setScale(12, RoundingMode.UP);
        if (order.getOrderVolume().compareTo(availableBalance) > 0) {
            throw new OrderVaildException(ErrorMessagerCode.AVAILABLE_BALANCE_NOT_ENOUGH);
        }
        orderFee = orderAmount.multiply(feeRate).setScale(12, RoundingMode.UP);
        order.setFee(orderFee);
        order.setFeeRate(feeRate);
        order.setAmount(orderAmount);
        order.setFilledPrice(BigDecimal.ZERO);
        order.setFilledVolume(BigDecimal.ZERO);
        order.setFilled(false);
        return order;
    }
}
