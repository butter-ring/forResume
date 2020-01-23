package com.cubeexchange.trade.order;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

public interface OrderOutstandingRepository extends CrudRepository<OrderOutstanding, Long> {

    @Query(value = "select count(*) from order_outstanding where symbol = :symbol and currency = :currency and order_price >= :orderPrice and order_position = 0", nativeQuery = true)
    long countAllBySymbolAndCurrencyForAsk(@Param("symbol") String symbol, @Param("currency") String currency, @Param("orderPrice") BigDecimal orderPrice);

    @Query(value = "select count(*) from order_outstanding where symbol = :symbol and currency = :currency and order_price <= :orderPrice and order_position = 1", nativeQuery = true)
    long countAllBySymbolAndCurrencyForBid(@Param("symbol") String symbol, @Param("currency") String currency, @Param("orderPrice") BigDecimal orderPrice);

    @Query(value = "select * from order_outstanding where symbol = :symbol and currency = :currency and order_price >= :orderPrice and order_position = 0 order by order_price desc limit 1", nativeQuery = true)
    OrderOutstanding findAllBySymbolAndCurrencyForAsk(@Param("symbol") String symbol, @Param("currency") String currency, @Param("orderPrice") BigDecimal orderPrice);

    @Query(value = "select * from order_outstanding where symbol = :symbol and currency = :currency and order_price <= :orderPrice and order_position = 1 order by order_price limit 1", nativeQuery = true)
    OrderOutstanding findAllBySymbolAndCurrencyForBid(@Param("symbol") String symbol, @Param("currency") String currency, @Param("orderPrice") BigDecimal orderPrice);

    @Transactional
    @Modifying
    @Query(value = "delete from order_outstanding where id = :id", nativeQuery = true)
    void deleteById(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "update order_outstanding set outstanding_volume = outstanding_volume - :outstandingVolume where id = :id", nativeQuery = true)
    void updateOutstandingVolume(@Param("outstandingVolume") BigDecimal outstandingVolume, @Param("id") Long id);
}
