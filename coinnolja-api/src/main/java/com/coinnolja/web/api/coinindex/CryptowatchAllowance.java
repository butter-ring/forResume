package com.coinnolja.web.api.coinindex;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)

public class CryptowatchAllowance {

    private BigDecimal cost;
    private BigDecimal remaining;

}
