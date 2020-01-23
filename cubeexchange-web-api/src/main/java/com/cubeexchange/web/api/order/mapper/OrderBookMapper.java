package com.cubeexchange.web.api.order.mapper;

import com.cubeexchange.web.api.order.view.OrderBook;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface OrderBookMapper {

    @SelectProvider(type = OrderBookMapperProvider.class, method = "findAsk")
    List<OrderBook> findAsk(@Param("symbol") String symbol);

    @SelectProvider(type = OrderBookMapperProvider.class, method = "findBid")
    List<OrderBook> findBid(@Param("symbol") String symbol);


}
