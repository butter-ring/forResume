package com.cubeexchange.trade.filled;

import com.cubeexchange.trade.account.Account;
import com.cubeexchange.trade.account.AccountRepository;
import com.cubeexchange.trade.account.constant.FeeRateDefault;
import com.cubeexchange.trade.commodity.Commodity;
import com.cubeexchange.trade.commodity.CommodityRepository;
import com.cubeexchange.trade.common.config.RabbitmqConfig;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import com.cubeexchange.trade.filled.constants.FilledType;
import com.cubeexchange.trade.filled.exception.OrderOutstandingVaildException;
import com.cubeexchange.trade.order.Order;
import com.cubeexchange.trade.order.OrderOutstanding;
import com.cubeexchange.trade.order.OrderOutstandingRepository;
import com.cubeexchange.trade.order.OrderRepository;
import com.cubeexchange.trade.order.constants.OrderPosition;
import com.cubeexchange.trade.order.exception.AccountVaildException;
import com.cubeexchange.trade.order.exception.CommodityVaildException;
import com.cubeexchange.trade.order.exception.OrderVaildException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Slf4j
@Service
public class FilledService {

    private final OrderRepository orderRepository;
    private final OrderOutstandingRepository orderOutstandingRepository;
    private final CommodityRepository commodityRepository;
    private final AccountRepository accountRepository;
    private final FilledOrderRepository filledOrderRepository;
    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    public FilledService(
            OrderRepository orderRepository
            , OrderOutstandingRepository orderOutstandingRepository
            , CommodityRepository commodityRepository
            , AccountRepository accountRepository
            , FilledOrderRepository filledOrderRepository
            , RabbitTemplate rabbitTemplate) {
        this.orderRepository = orderRepository;
        this.orderOutstandingRepository = orderOutstandingRepository;
        this.commodityRepository = commodityRepository;
        this.accountRepository = accountRepository;
        this.filledOrderRepository = filledOrderRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.objectMapper = new ObjectMapper();
    }


    public Long filled(Long orderOutstandingId) {
        Optional<OrderOutstanding> orderOutstanding = orderOutstandingRepository.findById(orderOutstandingId);
        if (!orderOutstanding.isPresent()) {
            throw new OrderOutstandingVaildException(ErrorMessagerCode.ORDER_OUTSTANDING_NOT_FOUND);
        }


        OrderOutstanding takerOutstanding = orderOutstanding.get();
        String symbol = takerOutstanding.getSymbol();
        Commodity commodity = commodityRepository.findBySymbolAndActive(symbol, 1);
        if (commodity == null) {
            throw new CommodityVaildException(ErrorMessagerCode.COMMODITY_NOT_FOUND);
        }
        if (commodity.getTradeState() != 1) {
            throw new CommodityVaildException(ErrorMessagerCode.COMMODITY_NOT_AVAILABLE);
        }

        OrderPosition orderPosition = takerOutstanding.getOrderPosition();
        Integer result = 0;
        if (orderPosition == OrderPosition.BUY) {
            result = filledBuy(orderOutstandingId);
        } else if (orderPosition == OrderPosition.SELL) {
            result = filledSell(orderOutstandingId);
        } else {
            throw new OrderVaildException(ErrorMessagerCode.ORDER_POSITION_NOT_ACCEPTABLE);
        }

//        Integer result = filled(takerOutstanding);
//        if (result > 0) {
//            rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameConfirm, "", sendData);
//        }
        return orderOutstandingId;
    }

    @Transactional
    public Integer filledBuy(Long orderOutstandingId) {
        Optional<OrderOutstanding> orderOutstanding = orderOutstandingRepository.findById(orderOutstandingId);
        if (!orderOutstanding.isPresent()) {
            throw new OrderOutstandingVaildException(ErrorMessagerCode.ORDER_OUTSTANDING_NOT_FOUND);
        }
        OrderOutstanding takerOutstanding = orderOutstanding.get();

        String symbol = takerOutstanding.getSymbol();
        String currency = takerOutstanding.getCurrency();
        BigDecimal orderPrice = takerOutstanding.getOrderPrice();
        Long memberId = takerOutstanding.getMemberId();
        OrderPosition orderPosition = takerOutstanding.getOrderPosition();
        BigDecimal takerOrderVolume = takerOutstanding.getOutstandingVolume();

        Account account = accountRepository.findByMemberIdAndCurrencyAndActive(memberId, currency, 1);
        if (account == null) {
            throw new AccountVaildException(ErrorMessagerCode.ACCOUNT_NOT_FOUND);
        }
        BigDecimal takerFeeRate = account.getTakerFeeRate();
        Order takerOrder = orderRepository.findById(takerOutstanding.getOrderId()).get();

        OrderOutstanding makerOutstanding = orderOutstandingRepository.findAllBySymbolAndCurrencyForBid(symbol, currency, orderPrice);

        if (makerOutstanding == null) {
            return 0;
        } else {
            Long makerMemberId = makerOutstanding.getMemberId();
            Account makerAccount = accountRepository.findByMemberIdAndCurrencyAndActive(makerMemberId, symbol, 1);
            if (makerAccount == null) {
                throw new AccountVaildException(ErrorMessagerCode.ACCOUNT_NOT_FOUND);
            }
            BigDecimal filledPrice = makerOutstanding.getOrderPrice();
            BigDecimal makerFeeRate = makerAccount.getMakerFeeRate();
            BigDecimal makerOutstandingVolume = makerOutstanding.getOutstandingVolume();

            /**
             * maker volume 이 더 큰 경우
             * 1. taker oustanding 삭제
             * 2. maker oustanding 업데이트
             * */
            if (makerOutstandingVolume.compareTo(takerOrderVolume) >= 0) {
                BigDecimal filledVolume = takerOrderVolume;
                BigDecimal filledAmount = filledPrice.multiply(filledVolume).setScale(12, RoundingMode.UP);

                FilledOrder takerFilledOrder = new FilledOrder();
                BigDecimal takerFee = filledAmount.multiply(takerFeeRate).setScale(12, RoundingMode.UP);
                takerFilledOrder.setFeeRate(takerFeeRate);
                takerFilledOrder.setFee(takerFee);
                takerFilledOrder.setFilledPrice(filledPrice);
                takerFilledOrder.setFilledVolume(filledVolume);
                takerFilledOrder.setFilledType(FilledType.TAKER);
                takerFilledOrder.setMemberId(memberId);
                takerFilledOrder.setSymbol(symbol);
                takerFilledOrder.setCurrency(currency);
                takerFilledOrder.setOrderId(takerOutstanding.getOrderId());
                filledOrderRepository.save(takerFilledOrder);
                Account takerAccount = accountRepository.findByMemberIdAndCurrencyAndActive(memberId, symbol, 1);
                if (takerAccount == null) {
                    Account takerAccountNew = new Account();
                    takerAccountNew.setAccountBalance(filledVolume);
                    takerAccountNew.setAvailableBalance(filledVolume);
                    takerAccountNew.setCurrency(symbol);
                    takerAccountNew.setMemberId(memberId);
                    takerAccountNew.setMakerFeeRate(FeeRateDefault.makerFeeRate);
                    takerAccountNew.setTakerFeeRate(FeeRateDefault.takerFeeRate);
                    accountRepository.save(takerAccountNew);

                } else {
                    accountRepository.updateBalanceByMemberIdAndCurrency(filledVolume, memberId, symbol);
                }
                takerOrder.setFilledVolume(takerOrder.getFilledVolume().add(filledVolume));
                takerOrder.setFilled(true);
                orderRepository.save(takerOrder);
                orderOutstandingRepository.deleteById(takerOutstanding.getId());

                FilledOrder makerFilledOrder = new FilledOrder();
                BigDecimal makerFee = filledAmount.multiply(makerFeeRate).setScale(12, RoundingMode.UP);
                makerFilledOrder.setFeeRate(makerFeeRate);
                makerFilledOrder.setFee(makerFee);
                makerFilledOrder.setFilledPrice(filledPrice);
                makerFilledOrder.setFilledVolume(filledVolume);
                makerFilledOrder.setFilledType(FilledType.MAKER);
                makerFilledOrder.setMemberId(makerMemberId);
                makerFilledOrder.setSymbol(symbol);
                makerFilledOrder.setCurrency(currency);
                makerFilledOrder.setOrderId(makerOutstanding.getOrderId());
                filledOrderRepository.save(makerFilledOrder);
                /** 수수료를 제외한 금액 입금 */
                BigDecimal totalMakerAmount = filledAmount.subtract(makerFee);
                accountRepository.updateBalanceByMemberIdAndCurrency(totalMakerAmount, makerMemberId, currency);

                Order makerOrder = orderRepository.findById(makerOutstanding.getOrderId()).get();
                log.debug("]-----] takerOrderVolume [-----[ {}", takerOrderVolume);
                log.debug("]-----] makerOutstandingVolume [-----[ {}", makerOutstandingVolume);
                log.debug("]-----] makerOutstandingVolume.compareTo(takerOrderVolume) [-----[ {}", makerOutstandingVolume.compareTo(takerOrderVolume));
                if (makerOutstandingVolume.compareTo(takerOrderVolume) == 0) {
                    orderOutstandingRepository.deleteById(makerOutstanding.getId());
                } else {
                    makerOutstanding.setOutstandingVolume(makerOutstanding.getOutstandingVolume().subtract(filledVolume));
                    orderOutstandingRepository.save(makerOutstanding);
                }

                if (makerOrder.getFilledVolume().add(filledVolume).compareTo(makerOrder.getOrderVolume()) == 0) {
                    makerOrder.setFilled(true);
                }
                makerOrder.setFilledVolume(makerOrder.getFilledVolume().add(filledVolume));
                orderRepository.save(makerOrder);

                try {
                    String jsonOrder = objectMapper.writeValueAsString(makerFilledOrder);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameFilled, "", jsonOrder);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

                return 1;

            } else {
                BigDecimal filledVolume = makerOutstandingVolume;
                BigDecimal filledAmount = filledPrice.multiply(filledVolume).setScale(12, RoundingMode.UP);

                FilledOrder takerFilledOrder = new FilledOrder();
                BigDecimal takerFee = filledAmount.multiply(takerFeeRate).setScale(12, RoundingMode.UP);
                takerFilledOrder.setFeeRate(takerFeeRate);
                takerFilledOrder.setFee(takerFee);
                takerFilledOrder.setFilledPrice(filledPrice);
                takerFilledOrder.setFilledVolume(filledVolume);
                takerFilledOrder.setFilledType(FilledType.TAKER);
                takerFilledOrder.setMemberId(memberId);
                takerFilledOrder.setSymbol(symbol);
                takerFilledOrder.setCurrency(currency);
                takerFilledOrder.setOrderId(takerOutstanding.getOrderId());
                filledOrderRepository.save(takerFilledOrder);
                Account takerAccount = accountRepository.findByMemberIdAndCurrencyAndActive(memberId, symbol, 1);
                if (takerAccount == null) {
                    Account takerAccountNew = new Account();
                    takerAccountNew.setAccountBalance(filledVolume);
                    takerAccountNew.setAvailableBalance(filledVolume);
                    takerAccountNew.setCurrency(symbol);
                    takerAccountNew.setMemberId(memberId);
                    takerAccountNew.setMakerFeeRate(FeeRateDefault.makerFeeRate);
                    takerAccountNew.setTakerFeeRate(FeeRateDefault.takerFeeRate);
                    accountRepository.save(takerAccountNew);
                } else {
                    accountRepository.updateBalanceByMemberIdAndCurrency(filledVolume, memberId, symbol);
                }
                takerOrder.setFilledVolume(takerOrder.getFilledVolume().add(filledVolume));
                takerOrder.setFilled(true);
                orderRepository.save(takerOrder);
//                orderOutstandingRepository.deleteById(takerOutstanding.getId());

                FilledOrder makerFilledOrder = new FilledOrder();
                BigDecimal makerFee = filledAmount.multiply(makerFeeRate).setScale(12, RoundingMode.UP);
                makerFilledOrder.setFeeRate(makerFeeRate);
                makerFilledOrder.setFee(makerFee);
                makerFilledOrder.setFilledPrice(filledPrice);
                makerFilledOrder.setFilledVolume(filledVolume);
                makerFilledOrder.setFilledType(FilledType.MAKER);
                makerFilledOrder.setMemberId(makerMemberId);
                makerFilledOrder.setSymbol(symbol);
                makerFilledOrder.setCurrency(currency);
                makerFilledOrder.setOrderId(makerOutstanding.getOrderId());
                filledOrderRepository.save(makerFilledOrder);

                /** 수수료를 제외한 금액 입금 */
                BigDecimal totalMakerAmount = filledAmount.subtract(makerFee);
                accountRepository.updateBalanceByMemberIdAndCurrency(totalMakerAmount, makerMemberId, currency);

                Order makerOrder = orderRepository.findById(makerOutstanding.getOrderId()).get();
                makerOrder.setFilledVolume(makerOrder.getFilledVolume().add(filledVolume));
                makerOrder.setFilled(true);
                orderOutstandingRepository.deleteById(makerOutstanding.getId());
                orderRepository.save(makerOrder);

                takerOutstanding.setOutstandingVolume(takerOutstanding.getOutstandingVolume().subtract(filledVolume));
                orderOutstandingRepository.save(takerOutstanding);
                try {
                    String jsonOrder = objectMapper.writeValueAsString(makerFilledOrder);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameFilled, "", jsonOrder);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

            }
        }


        return filledBuy(orderOutstandingId);


    }


    @Transactional
    public Integer filledSell(Long orderOutstandingId) {
        Optional<OrderOutstanding> orderOutstanding = orderOutstandingRepository.findById(orderOutstandingId);
        if (!orderOutstanding.isPresent()) {
            throw new OrderOutstandingVaildException(ErrorMessagerCode.ORDER_OUTSTANDING_NOT_FOUND);
        }
        OrderOutstanding takerOutstanding = orderOutstanding.get();
        log.debug("]-----] filledSell.takerOutstanding call[-----[ {}", takerOutstanding);

        String symbol = takerOutstanding.getSymbol();
        String currency = takerOutstanding.getCurrency();
        BigDecimal orderPrice = takerOutstanding.getOrderPrice();
        Long memberId = takerOutstanding.getMemberId();
        OrderPosition orderPosition = takerOutstanding.getOrderPosition();
        BigDecimal takerOrderVolume = takerOutstanding.getOutstandingVolume();

        Account account = accountRepository.findByMemberIdAndCurrencyAndActive(memberId, symbol, 1);
        if (account == null) {
            throw new AccountVaildException(ErrorMessagerCode.ACCOUNT_NOT_FOUND);
        }
        BigDecimal takerFeeRate = account.getTakerFeeRate();
        Order takerOrder = orderRepository.findById(takerOutstanding.getOrderId()).get();

        OrderOutstanding makerOutstanding = orderOutstandingRepository.findAllBySymbolAndCurrencyForAsk(symbol, currency, orderPrice);

        if (makerOutstanding == null) {
            return 0;
        } else {
            Long makerMemberId = makerOutstanding.getMemberId();
            Account makerAccount = accountRepository.findByMemberIdAndCurrencyAndActive(makerMemberId, currency, 1);
            if (makerAccount == null) {
                throw new AccountVaildException(ErrorMessagerCode.ACCOUNT_NOT_FOUND);
            }
            BigDecimal filledPrice = makerOutstanding.getOrderPrice();
            BigDecimal makerFeeRate = makerAccount.getMakerFeeRate();
            BigDecimal makerOutstandingVolume = makerOutstanding.getOutstandingVolume();

            if (makerOutstandingVolume.compareTo(takerOrderVolume) >= 0) {
                BigDecimal filledVolume = takerOrderVolume;
                BigDecimal filledAmount = filledPrice.multiply(filledVolume).setScale(12, RoundingMode.UP);

                FilledOrder takerFilledOrder = new FilledOrder();
                BigDecimal takerFee = filledAmount.multiply(takerFeeRate).setScale(12, RoundingMode.UP);
                takerFilledOrder.setFeeRate(takerFeeRate);
                takerFilledOrder.setFee(takerFee);
                takerFilledOrder.setFilledPrice(filledPrice);
                takerFilledOrder.setFilledVolume(filledVolume);
                takerFilledOrder.setFilledType(FilledType.TAKER);
                takerFilledOrder.setMemberId(memberId);
                takerFilledOrder.setSymbol(symbol);
                takerFilledOrder.setCurrency(currency);
                takerFilledOrder.setOrderId(takerOutstanding.getOrderId());
                filledOrderRepository.save(takerFilledOrder);
                /** 체결된 수량만큼 차감 */
                accountRepository.updateBalanceByMemberIdAndCurrency(filledVolume.multiply(new BigDecimal(-1)), memberId, symbol);
                /** 수수료를 제외한 금액 입금 */
                BigDecimal totalTakerAmount = filledAmount.subtract(takerFee);
                accountRepository.updateBalanceByMemberIdAndCurrency(totalTakerAmount, memberId, currency);
                takerOrder.setFilledVolume(filledVolume);
                takerOrder.setFilled(true);
                orderRepository.save(takerOrder);
                log.debug("]-----] takerOrderVolume [-----[ {}", takerOrderVolume);
                log.debug("]-----] makerOutstandingVolume [-----[ {}", makerOutstandingVolume);
                log.debug("]-----] makerOutstandingVolume.compareTo(takerOrderVolume) [-----[ {}", makerOutstandingVolume.compareTo(takerOrderVolume));
                orderOutstandingRepository.deleteById(takerOutstanding.getId());

                FilledOrder makerFilledOrder = new FilledOrder();
                BigDecimal makerFee = filledAmount.multiply(makerFeeRate).setScale(12, RoundingMode.UP);
                makerFilledOrder.setFeeRate(makerFeeRate);
                makerFilledOrder.setFee(makerFee);
                makerFilledOrder.setFilledPrice(filledPrice);
                makerFilledOrder.setFilledVolume(filledVolume);
                makerFilledOrder.setFilledType(FilledType.MAKER);
                makerFilledOrder.setMemberId(makerMemberId);
                makerFilledOrder.setSymbol(symbol);
                makerFilledOrder.setCurrency(currency);
                makerFilledOrder.setOrderId(makerOutstanding.getOrderId());
                filledOrderRepository.save(makerFilledOrder);
                Account makerAccountSymbol = accountRepository.findByMemberIdAndCurrencyAndActive(makerMemberId, symbol, 1);
                if (makerAccountSymbol == null) {
                    Account makerAccountNew = new Account();
                    makerAccountNew.setAccountBalance(filledVolume);
                    makerAccountNew.setAvailableBalance(filledVolume);
                    makerAccountNew.setCurrency(symbol);
                    makerAccountNew.setMemberId(makerMemberId);
                    makerAccountNew.setMakerFeeRate(FeeRateDefault.makerFeeRate);
                    makerAccountNew.setTakerFeeRate(FeeRateDefault.takerFeeRate);
                    accountRepository.save(makerAccountNew);
                } else {
                    accountRepository.updateBalanceByMemberIdAndCurrency(filledVolume, makerMemberId, symbol);
                }

                Order makerOrder = orderRepository.findById(makerOutstanding.getOrderId()).get();
                if (makerOutstandingVolume.compareTo(takerOrderVolume) > 0) {
//                    makerOutstanding.setOutstandingVolume(makerOutstanding.getOutstandingVolume().subtract(filledVolume));
                    orderOutstandingRepository.updateOutstandingVolume(filledVolume, makerOutstanding.getId());
                    log.debug("]-----] makerOutstanding save call[-----[ {}", makerOutstanding);
                } else {
                    orderOutstandingRepository.deleteById(makerOutstanding.getId());
                    log.debug("]-----] makerOutstanding deleteById call[-----[ {}", makerOutstanding);
                }
                log.debug("]-----] makerOutstanding [-----[ {}", makerOutstanding);
                if (makerOrder.getFilledVolume().add(filledVolume).compareTo(makerOrder.getOrderVolume()) == 0) {
                    makerOrder.setFilled(true);
                }
                makerOrder.setFilledVolume(makerOrder.getFilledVolume().add(filledVolume));
                orderRepository.save(makerOrder);
//                rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameFilled, "", makerFilledOrder);
                try {
                    String jsonOrder = objectMapper.writeValueAsString(makerFilledOrder);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameFilled, "", jsonOrder);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                return 1;

            } else {
                BigDecimal filledVolume = makerOutstandingVolume;
                BigDecimal filledAmount = filledPrice.multiply(filledVolume).setScale(12, RoundingMode.UP);

                FilledOrder takerFilledOrder = new FilledOrder();
                BigDecimal takerFee = filledAmount.multiply(takerFeeRate).setScale(12, RoundingMode.UP);
                takerFilledOrder.setFeeRate(takerFeeRate);
                takerFilledOrder.setFee(takerFee);
                takerFilledOrder.setFilledPrice(filledPrice);
                takerFilledOrder.setFilledVolume(filledVolume);
                takerFilledOrder.setFilledType(FilledType.TAKER);
                takerFilledOrder.setMemberId(memberId);
                takerFilledOrder.setSymbol(symbol);
                takerFilledOrder.setCurrency(currency);
                takerFilledOrder.setOrderId(takerOutstanding.getOrderId());
                filledOrderRepository.save(takerFilledOrder);
                /** 체결된 수량만큼 차감 */
                accountRepository.updateBalanceByMemberIdAndCurrency(filledVolume.multiply(new BigDecimal(-1)), memberId, symbol);
                /** 수수료를 제외한 금액 입금 */
                BigDecimal totalTakerAmount = filledAmount.subtract(takerFee);
                accountRepository.updateBalanceByMemberIdAndCurrency(totalTakerAmount, memberId, currency);
                takerOrder.setFilledVolume(filledVolume);
//                takerOrder.setFilled(true);
                orderRepository.save(takerOrder);
//                orderOutstandingRepository.deleteById(takerOutstanding.getId());

                FilledOrder makerFilledOrder = new FilledOrder();
                BigDecimal makerFee = filledAmount.multiply(makerFeeRate).setScale(12, RoundingMode.UP);
                makerFilledOrder.setFeeRate(makerFeeRate);
                makerFilledOrder.setFee(makerFee);
                makerFilledOrder.setFilledPrice(filledPrice);
                makerFilledOrder.setFilledVolume(filledVolume);
                makerFilledOrder.setFilledType(FilledType.MAKER);
                makerFilledOrder.setMemberId(makerMemberId);
                makerFilledOrder.setSymbol(symbol);
                makerFilledOrder.setCurrency(currency);
                makerFilledOrder.setOrderId(makerOutstanding.getOrderId());
                filledOrderRepository.save(makerFilledOrder);

                Account makerAccountSymbol = accountRepository.findByMemberIdAndCurrencyAndActive(makerMemberId, symbol, 1);
                if (makerAccountSymbol == null) {
                    Account makerAccountNew = new Account();
                    makerAccountNew.setAccountBalance(filledVolume);
                    makerAccountNew.setAvailableBalance(filledVolume);
                    makerAccountNew.setCurrency(symbol);
                    makerAccountNew.setMemberId(makerMemberId);
                    makerAccountNew.setMakerFeeRate(FeeRateDefault.makerFeeRate);
                    makerAccountNew.setTakerFeeRate(FeeRateDefault.takerFeeRate);
                    accountRepository.save(makerAccountNew);
                } else {
                    accountRepository.updateBalanceByMemberIdAndCurrency(filledVolume, makerMemberId, symbol);
                }


                Order makerOrder = orderRepository.findById(makerOutstanding.getOrderId()).get();
                makerOrder.setFilledVolume(makerOrder.getFilledVolume().add(filledVolume));
                makerOrder.setFilled(true);
                orderOutstandingRepository.deleteById(makerOutstanding.getId());
                orderRepository.save(makerOrder);
                log.debug("]-----] takerOutstanding 1 [-----[ {}", takerOutstanding);
                takerOutstanding.setOutstandingVolume(takerOutstanding.getOutstandingVolume().subtract(filledVolume));
                log.debug("]-----] takerOutstanding 2 [-----[ {}", takerOutstanding);
                orderOutstandingRepository.save(takerOutstanding);
                log.debug("]-----] takerOutstanding 3 [-----[ {}", takerOutstanding);
//                rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameFilled, "", makerFilledOrder);
                try {
                    String jsonOrder = objectMapper.writeValueAsString(makerFilledOrder);
                    rabbitTemplate.convertAndSend(RabbitmqConfig.exchangeNameFilled, "", jsonOrder);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
        }


        return filledSell(orderOutstandingId);


    }


}
