package com.coinnolja.web.api.coinindex;

import com.coinnolja.web.api.exchange.ExchangeRate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
@Component
public class CoinIndexUtils {

    /**
     * {"result":{"price":{"last":8362000,"high":8743000,"low":7914000,"change":{"percentage":-0.041934006,"absolute":-366000}},"volume":8296.76359238,"volumeQuote":68563082107.04664},"allowance":{"cost":8806787,"remaining":7618689039}}
     */
    public CoinIndex getCoinIndexForCryptowatch(
            ResponseEntity<String> response
            , String exchangeName
            , String symbol
            , ExchangeRate exchangeRate
            , String currency
            , BigDecimal coinIdexUsd
    ) {
        CoinIndex coinIndex = new CoinIndex();
        coinIndex.setExchangeName(exchangeName);
        coinIndex.setSymbol(symbol);
        if (coinIdexUsd != null) {
            coinIndex.setCoinIdexUsd(coinIdexUsd);
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
            if (root != null) {
                JsonNode result = root.get("result");
                BigDecimal priceKrw = result.get("price").get("last").decimalValue();
                BigDecimal priceUsd = priceKrw.divide(exchangeRate.getDealBasR(), 2, RoundingMode.FLOOR);
                if ("USD".equals(currency)) {
                    priceKrw = result.get("price").get("last").decimalValue().multiply(exchangeRate.getDealBasR()).setScale(0, RoundingMode.FLOOR);
                    priceUsd = result.get("price").get("last").decimalValue().setScale(2, RoundingMode.FLOOR);
                } else if ("BTC".equals(currency)) {

                }

                coinIndex.setPriceKrw(priceKrw);
                coinIndex.setPriceUsd(priceUsd);
                coinIndex.setVariationValueForDay(result.get("price").get("change").get("absolute").decimalValue().setScale(0, RoundingMode.FLOOR));
                coinIndex.setVariationRateForDay(result.get("price").get("change").get("percentage").decimalValue().multiply(new BigDecimal(100)).setScale(2, RoundingMode.FLOOR));
                coinIndex.setTotalExcangeForDay(result.get("volume").decimalValue().setScale(2, RoundingMode.FLOOR));
            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForCryptowatch error [-----[ {}", e);
        }

        return coinIndex;
    }

    /**
     * {"status":"0000","data":{"opening_price":"9628000","closing_price":"9810000","min_price":"9242000","max_price":"9833000","average_price":"9557571.9862","units_traded":"9617.98354287","volume_1day":"9617.98354287","volume_7day":"68294.60244092","buy_price":"9807000","sell_price":"9810000","24H_fluctate":"182000","24H_fluctate_rate":"1.89","date":"1557976581273"}}
     */
    public CoinIndex getCoinIndexForBithumb(
            ResponseEntity<String> response
            , String exchangeName
            , String symbol
            , ExchangeRate exchangeRate
            , BigDecimal coinIdexUsd
    ) {

        CoinIndex coinIndex = new CoinIndex();
        coinIndex.setExchangeName(exchangeName);
        coinIndex.setSymbol(symbol);
        if (coinIdexUsd != null) {
            coinIndex.setCoinIdexUsd(coinIdexUsd);
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
            if (root != null) {

                if ("0000".equals(root.get("status").asText())) {
                    JsonNode data = root.get("data");

                    BigDecimal priceKrw = new BigDecimal(data.get("closing_price").asText());
                    coinIndex.setPriceKrw(priceKrw);
                    coinIndex.setPriceUsd(priceKrw.divide(exchangeRate.getDealBasR(), 2, RoundingMode.FLOOR));
                    coinIndex.setVariationValueForDay(new BigDecimal(data.get("24H_fluctate").asText()).setScale(0, RoundingMode.FLOOR));
                    coinIndex.setVariationRateForDay(new BigDecimal(data.get("24H_fluctate_rate").asText()).setScale(2, RoundingMode.FLOOR));
                    coinIndex.setTotalExcangeForDay(new BigDecimal(data.get("volume_1day").asText()).setScale(2, RoundingMode.FLOOR));

                }

            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForBithumb error [-----[ {}", e);
        }

        return coinIndex;
    }


    /**
     * {"market":"KRW-BTC","trade_date":"20190516","trade_time":"050820","trade_date_kst":"20190516","trade_time_kst":"140820","trade_timestamp":1557983300000,"opening_price":9606000.0,"high_price":9842000.0,"low_price":9390000.0,"trade_price":9559000.0,"prev_closing_price":9606000.0,"change":"FALL","change_price":47000.0,"change_rate":0.0048927753,"signed_change_price":-47000.0,"signed_change_rate":-0.0048927753,"trade_volume":0.02132108,"acc_trade_price":4.247173800124926E10,"acc_trade_price_24h":1.9850507502566748E11,"acc_trade_volume":4374.96152979,"acc_trade_volume_24h":20766.4201382,"highest_52_week_price":9907000.0,"highest_52_week_date":"2019-05-14","lowest_52_week_price":3562000.0,"lowest_52_week_date":"2018-12-15","timestamp":1557983300498}
     */
    public CoinIndex getCoinIndexForUpbit(
            ResponseEntity<String> response
            , String exchangeName
            , String symbol
            , ExchangeRate exchangeRate
            , BigDecimal coinIdexUsd
    ) {

        CoinIndex coinIndex = new CoinIndex();
        coinIndex.setExchangeName(exchangeName);
        coinIndex.setSymbol(symbol);
        if (coinIdexUsd != null) {
            coinIndex.setCoinIdexUsd(coinIdexUsd);
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
            if (root != null) {

                JsonNode data = root.get(0);

                BigDecimal priceKrw = data.get("trade_price").decimalValue();
                coinIndex.setPriceKrw(priceKrw.setScale(0, RoundingMode.FLOOR));
                coinIndex.setPriceUsd(priceKrw.divide(exchangeRate.getDealBasR(), 2, RoundingMode.FLOOR));
                BigDecimal prevClosingPrice = data.get("prev_closing_price").decimalValue(); //전일종가
                BigDecimal variationValueForDay = priceKrw.subtract(prevClosingPrice);
                coinIndex.setVariationValueForDay(variationValueForDay.setScale(0, RoundingMode.FLOOR));
                coinIndex.setVariationRateForDay(variationValueForDay.divide(prevClosingPrice, 4, RoundingMode.FLOOR).multiply(new BigDecimal(100)).setScale(2, RoundingMode.FLOOR));
                coinIndex.setTotalExcangeForDay(data.get("acc_trade_volume_24h").decimalValue().setScale(2, RoundingMode.FLOOR));

            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForUpbit error [-----[ {}", e);
        }

        return coinIndex;
    }

    /**
     * {"market":"KRW-BTC","trade_date":"20190516","trade_time":"050820","trade_date_kst":"20190516","trade_time_kst":"140820","trade_timestamp":1557983300000,"opening_price":9606000.0,"high_price":9842000.0,"low_price":9390000.0,"trade_price":9559000.0,"prev_closing_price":9606000.0,"change":"FALL","change_price":47000.0,"change_rate":0.0048927753,"signed_change_price":-47000.0,"signed_change_rate":-0.0048927753,"trade_volume":0.02132108,"acc_trade_price":4.247173800124926E10,"acc_trade_price_24h":1.9850507502566748E11,"acc_trade_volume":4374.96152979,"acc_trade_volume_24h":20766.4201382,"highest_52_week_price":9907000.0,"highest_52_week_date":"2019-05-14","lowest_52_week_price":3562000.0,"lowest_52_week_date":"2018-12-15","timestamp":1557983300498}
     */
    public CoinIndex getCoinIndexForKobit(
            ResponseEntity<String> response
            , String exchangeName
            , String symbol
            , ExchangeRate exchangeRate
            , BigDecimal coinIdexUsd
    ) {

        CoinIndex coinIndex = new CoinIndex();
        coinIndex.setExchangeName(exchangeName);
        coinIndex.setSymbol(symbol);
        if (coinIdexUsd != null) {
            coinIndex.setCoinIdexUsd(coinIdexUsd);
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
            if (root != null) {
//            log.debug("]-----] root [-----[ {}", root);
                BigDecimal priceKrw = new BigDecimal(root.get("last").asText());
                coinIndex.setPriceKrw(priceKrw.setScale(0, RoundingMode.FLOOR));
                coinIndex.setPriceUsd(priceKrw.divide(exchangeRate.getDealBasR(), 2, RoundingMode.FLOOR));

                coinIndex.setVariationValueForDay(new BigDecimal(root.get("change").asText()).setScale(0, RoundingMode.FLOOR));
                coinIndex.setVariationRateForDay(new BigDecimal(root.get("changePercent").asText()));
                coinIndex.setTotalExcangeForDay(new BigDecimal(root.get("volume").asText()).setScale(2, RoundingMode.FLOOR));

            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForKobit error [-----[ {}", e);
        }

        return coinIndex;
    }


    /**
     * {"currency":"ltc","volume":"13467.7131","last":"120000.0","yesterday_last":"109050.0","timestamp":"1557993499","yesterday_low":"104150.0","errorCode":"0","yesterday_volume":"9252.51","high":"126300.0","result":"success","yesterday_first":"110500.0","first":"109050.0","yesterday_high":"115000.0","low":"107900.0"}
     */
    public CoinIndex getCoinIndexForCoinone(
            ResponseEntity<String> response
            , String exchangeName
            , String symbol
            , ExchangeRate exchangeRate
            , BigDecimal coinIdexUsd
    ) {

        CoinIndex coinIndex = new CoinIndex();
        coinIndex.setExchangeName(exchangeName);
        coinIndex.setSymbol(symbol);
        if (coinIdexUsd != null) {
            coinIndex.setCoinIdexUsd(coinIdexUsd);
        }
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
            if (root != null) {
                log.debug("]-----] root [-----[ {}", root);
                if (root.get("last") != null) {
                    BigDecimal priceKrw = new BigDecimal(root.get("last").asText());
                    coinIndex.setPriceKrw(priceKrw.setScale(0, RoundingMode.FLOOR));
                    coinIndex.setPriceUsd(priceKrw.divide(exchangeRate.getDealBasR(), 2, RoundingMode.FLOOR));

                    BigDecimal prevClosingPrice = new BigDecimal(root.get("yesterday_last").asText()); //전일종가
                    BigDecimal variationValueForDay = priceKrw.subtract(prevClosingPrice);
                    coinIndex.setVariationValueForDay(variationValueForDay.setScale(0, RoundingMode.FLOOR));
                    coinIndex.setVariationRateForDay(variationValueForDay.divide(prevClosingPrice, 4, RoundingMode.FLOOR).multiply(new BigDecimal(100)).setScale(2, RoundingMode.FLOOR));
                    coinIndex.setTotalExcangeForDay(new BigDecimal(root.get("volume").asText()).setScale(2, RoundingMode.FLOOR));
                }


            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForCoinone error [-----[ {}", e);

        }

        return coinIndex;
    }


    public CoinIndex getCoinIndexForJsoup(
            String exchangeName
            , String symbol
    ) {

        CoinIndex coinIndex = new CoinIndex();
        coinIndex.setExchangeName(exchangeName);
        coinIndex.setSymbol(symbol);

        try {

        } catch (Exception e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForCoinone error [-----[ {}", e);

        }

        return coinIndex;
    }


}
