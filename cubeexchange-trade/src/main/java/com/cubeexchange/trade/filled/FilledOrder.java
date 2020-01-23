package com.cubeexchange.trade.filled;

import com.cubeexchange.trade.common.model.BaseEntity;
import com.cubeexchange.trade.filled.constants.FilledType;
import com.cubeexchange.trade.order.Order;
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
public class FilledOrder extends BaseEntity {

    private Long orderId;
    private Long memberId;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal filledVolume;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal filledPrice;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal fee;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal feeRate;
    private FilledType filledType;
    private String currency;
    private String symbol;

}
