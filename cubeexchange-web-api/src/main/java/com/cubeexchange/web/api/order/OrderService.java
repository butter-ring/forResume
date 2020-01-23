package com.cubeexchange.web.api.order;

import com.cubeexchange.web.api.filled.FilledOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.FluxSink;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service
public class OrderService {

    private final FluxProcessor processor;
    private final FluxSink sink;
    private final AtomicLong counter;

    private final FluxProcessor processorFilled;
    private final FluxSink sinkFilled;

    private List<OrderConfirm> confirms = new ArrayList<OrderConfirm>();
    private ConcurrentHashMap<Long, List<OrderConfirm>> confirmErrors = new ConcurrentHashMap<>();

    public OrderService() {
        this.processor = DirectProcessor.create().serialize();
        this.sink = processor.sink();
        this.processorFilled = DirectProcessor.create().serialize();
        this.sinkFilled = processorFilled.sink();
        this.counter = new AtomicLong();
    }

    public synchronized void addConfirm(OrderConfirm orderConfirm) {
        confirms.add(orderConfirm);
    }


    public synchronized void addConfirmError(OrderConfirm orderConfirm) {
        Long memberId = orderConfirm.getMemberId();
        List<OrderConfirm> confirmError = confirmErrors.get(memberId);
        if (confirmError == null) {
//            List<OrderConfirm> confirmErrorMember = new ArrayList<>();
            List<OrderConfirm> confirmErrorMember = Collections.synchronizedList(new ArrayList());

            synchronized (confirmErrorMember) {
                confirmErrorMember.add(orderConfirm);
            }
            confirmErrors.put(memberId, confirmErrorMember);
        } else {
//            confirmError.add(orderConfirm);
            synchronized (confirmError) {
                confirmError.add(orderConfirm);
            }
        }
        log.debug("]-----] OrderService::addConfirmError confirmErrors [-----[ {}", confirmErrors);
        log.debug("]-----] OrderService::addConfirmError confirmError [-----[ {}", confirmError);

    }

    public Flux<OrderConfirm> getConfirmMember(Long memberId) {
        Flux<OrderConfirm> processorFlux = processor.map(e ->
        {
            log.debug("]-----] OrderService::getConfirmMember e [-----[ {}", e);
            OrderConfirm orderConfirm = (OrderConfirm) e;
            if (memberId.equals(orderConfirm.getMemberId())) {
                return ServerSentEvent.builder(orderConfirm).build();
            } else {
                return Flux.empty();
            }
        });
        return processorFlux;
    }

    public Flux<OrderConfirm> getConfirm() {
        return processor.map(e -> ServerSentEvent.builder(e).build());
    }

    public void sendConfirmMember(OrderConfirm orderConfirm) {
        sink.next(orderConfirm);
    }


    public Flux<FilledOrder> getFilled() {
        return processorFilled.map(e -> ServerSentEvent.builder(e).build());
    }
    public void sendFilled(FilledOrder filledOrder) {
        sinkFilled.next(filledOrder);
    }

}
