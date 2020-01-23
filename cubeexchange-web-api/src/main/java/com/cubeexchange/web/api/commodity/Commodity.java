package com.cubeexchange.web.api.commodity;

import com.cubeexchange.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Commodity extends BaseEntity {

//    @Id
    private String symbol; //symbol :BTC

    private BigDecimal minimumPrice;

    private String priceCurrency;

    private Integer tradeState; //0:trad OK, 1:trad fail

    private BigDecimal previousClosingIndex; //전일00시기준 인덱스

    private Integer priceLimit;
}


