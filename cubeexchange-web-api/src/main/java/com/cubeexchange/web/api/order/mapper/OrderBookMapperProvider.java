package com.cubeexchange.web.api.order.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

public class OrderBookMapperProvider {


    public String findAsk(@Param("symbol") String symbol) {

        String sql = new SQL() {{
            SELECT(
                    "order_price"
                    , "sum(outstanding_volume) as order_volume"
                    , "order_price * sum(outstanding_volume) as total_amount"
            );
            FROM("order_outstanding ");
            WHERE("order_position = 1 and symbol = #{symbol}");

        }}.toString();

        StringBuilder builder = new StringBuilder(sql);
        builder.append(" GROUP BY order_price ");
        builder.append(" ORDER BY order_price desc");
        builder.append(" LIMIT 6");
        return builder.toString();
    }

    public String findBid(@Param("symbol") String symbol) {

        String sql = new SQL() {{
            SELECT(
                    "order_price"
                    , "sum(outstanding_volume) as order_volume"
                    , "order_price * sum(outstanding_volume) as total_amount"
            );
            FROM("order_outstanding ");
            WHERE("order_position = 0 and symbol = #{symbol}");

        }}.toString();

        StringBuilder builder = new StringBuilder(sql);
        builder.append(" GROUP BY order_price ");
        builder.append(" ORDER BY order_price desc");
        builder.append(" LIMIT 6");
        return builder.toString();
    }


}
