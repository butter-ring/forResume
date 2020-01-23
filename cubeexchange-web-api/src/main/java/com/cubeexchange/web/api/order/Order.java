package com.cubeexchange.web.api.order;

import com.cubeexchange.web.api.common.model.BaseEntity;
import com.cubeexchange.web.api.order.constants.OrderPosition;
import com.cubeexchange.web.api.order.constants.OrderStatus;
import com.cubeexchange.web.api.order.constants.OrderType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "cn_order")
public class Order extends BaseEntity {

    private Long memberId;
    private String symbol;
    private OrderStatus orderStatus;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal orderPrice;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal orderVolume;
    private OrderType orderType;
    private String accountType;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal filledPrice = BigDecimal.ZERO;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal filledVolume;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal fee;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal feeRate;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal amount;
    private String currency;
    private OrderPosition orderPosition;
    private Boolean filled;

}
