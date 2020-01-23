package com.cubeexchange.web.api.order.view;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderBooks {

    private List<OrderBook> asks;
    private List<OrderBook> bids;


}
