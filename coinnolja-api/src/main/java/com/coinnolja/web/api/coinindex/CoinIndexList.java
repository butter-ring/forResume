package com.coinnolja.web.api.coinindex;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoinIndexList implements Serializable {

    private String symbol;
    private List<CoinIndex> coinIndexes;

}
