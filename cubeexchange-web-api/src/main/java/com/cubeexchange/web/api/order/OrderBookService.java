package com.cubeexchange.web.api.order;

import com.cubeexchange.web.api.order.mapper.OrderBookMapper;
import com.cubeexchange.web.api.order.view.OrderBooks;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class OrderBookService {

    private final OrderBookMapper orderBookMapper;

    public OrderBookService(OrderBookMapper orderBookMapper) {
        this.orderBookMapper = orderBookMapper;
    }

    public Mono<OrderBooks> orderBook(String symbol) {
        OrderBooks orderBooks = new OrderBooks();

        orderBooks.setAsks(orderBookMapper.findAsk(symbol));
        orderBooks.setBids(orderBookMapper.findBid(symbol));
        return Mono.just(orderBooks);

    }
}
