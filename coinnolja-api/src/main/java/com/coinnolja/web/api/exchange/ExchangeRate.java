package com.coinnolja.web.api.exchange;

import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class ExchangeRate extends BaseEntity {

    private String curUnit;
    private BigDecimal ttb;
    private BigDecimal tts;
    private BigDecimal dealBasR;
    private Integer bkpr;
    private BigDecimal yyEfeeR;
    private BigDecimal tenDdEfeeR;
    private Integer kftcBkpr;
    private BigDecimal kftcDealBasR;
    private String curNm;

}
