package com.cubeexchange.web.api.coingecko;

import com.cubeexchange.web.api.coingecko.coindata.Roi;
import com.cubeexchange.web.api.coingecko.coindata.SparklineIn7d;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;


@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoinMarkets implements Serializable {

    @JsonProperty("id")
    private String id;
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("name")
    private String name;
    @JsonProperty("image")
    private String image;
    @JsonProperty("current_price")
    private double currentPrice;
    @JsonProperty("market_cap")
    private long marketCap;
    @JsonProperty("market_cap_rank")
    private long marketCapRank;
    @JsonProperty("total_volume")
    private long totalVolume;
    @JsonProperty("high_24h")
    private double high24h;
    @JsonProperty("low_24h")
    private double low24h;
    @JsonProperty("price_change_24h")
    private double priceChange24h;
    @JsonProperty("price_change_percentage_24h")
    private double priceChangePercentage24h;
    @JsonProperty("market_cap_change_24h")
    private long marketCapChange24h;
    @JsonProperty("market_cap_change_percentage_24h")
    private double marketCapChangePercentage24h;
    @JsonProperty("circulating_supply")
    private long circulatingSupply;
    @JsonProperty("total_supply")
    private long totalSupply;
    @JsonProperty("ath")
    private long ath;
    @JsonProperty("ath_change_percentage")
    private double athChangePercentage;
    @JsonProperty("ath_date")
    private String athDate;
    @JsonProperty("roi")
    private Roi roi;
    @JsonProperty("last_updated")
    private String lastUpdated;
    @JsonProperty("sparkline_in_7d")
    private SparklineIn7d sparklineIn7d;
    @JsonProperty("price_change_percentage_1h_in_currency")
    private double priceChangePercentage1hInCurrency;



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
