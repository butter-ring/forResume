package com.coinnolja.web.api.coinindex;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoinIndex implements Serializable {

    private String name;
    private String symbol;
    private String exchangeName;
    private String exchangeLogo;

    private BigDecimal priceKrw;
    private BigDecimal priceUsd;
    private BigDecimal gapKrw;
    private BigDecimal gapKrwRate;
    private BigDecimal variationValueForDay;
    private BigDecimal variationRateForDay;
    private BigDecimal totalExcangeForDay;
    private BigDecimal coinIdexUsd;

//    public BigDecimal getGapKrw() {
//        if (this.coinIdexUsd != null && this.priceKrw != null) {
//            return this.priceKrw.subtract(this.coinIdexUsd);
//        } else {
//            return BigDecimal.ZERO;
//        }
//
//    }
//
//    public BigDecimal getGapKrwRate() {
//        if (this.coinIdexUsd != null && this.priceKrw != null) {
//            return this.priceKrw.subtract(this.coinIdexUsd).divide(this.priceKrw, 4, RoundingMode.FLOOR).multiply(new BigDecimal(100)).setScale(2, RoundingMode.FLOOR);
//        } else {
//            return BigDecimal.ZERO;
//        }
//    }
}
