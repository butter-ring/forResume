package com.cubeexchange.trade.order;

import com.cubeexchange.trade.common.model.BaseEntity;
import com.cubeexchange.trade.order.constants.OrderPosition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class OrderOutstanding extends BaseEntity {

    private Long orderId;
    private Long memberId;
    private String symbol;
    private String currency;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal outstandingVolume;
    private Boolean filled;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal orderPrice;
    private OrderPosition orderPosition;

}
