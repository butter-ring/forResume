package com.coinnolja.web.api.coinindex;

import com.coinnolja.web.api.ApiApplicationTests;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@ActiveProfiles("local")
public class CoinIndexServiceTest extends ApiApplicationTests {

    @Autowired
    private CoinIndexService coinIndexService;

    @Test
    public void getMovieEvents() {
//        FluxExchangeResult<CoinIdex> result  =  webTestClient.get().uri("https://api.cryptowat.ch/markets/bithumb/btckrw/summary" )
//                .accept(MediaType.APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isOk()
//                .returnResult(CoinIdex.class);

        WebTestClient
                .bindToServer()
                .baseUrl("https://api.cryptowat.ch")
                .build()
                .get()
                .uri("/markets/bithumb/btckrw/summary")
                .exchange()
        ;
//                .expectStatus().isCreated()
//                .expectHeader().valueEquals("Content-Type", "application/json")
//                .expectBody().isEmpty();
    }

    @Test
    public void findBTC() {
        coinIndexService.findBTC();
    }

    @Test
    public void findAll() {
        coinIndexService.findAllIndex();
    }

    @Test
    public void findAllPan() {
        coinIndexService.makeCoinIndexPan("BCH");
    }

//    @Autowired
//    private RestTemplate restTemplate;

    @Test
    public void jsonTest() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> bithumbBtc
                = restTemplate.getForEntity("https://coinpan.com/files/currency/update.json", String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;

        String[] exchanges = {"bitflyer", "poloniex", "bittrex", "okcoin", "huobi"};
        try {
            root = mapper.readTree(bithumbBtc.getBody());
            if (root != null) {
                JsonNode result = root.get("prices");
                for(String exchange : exchanges){
                    result.get(exchange);
                    log.debug("]-----] makeCoinIndex::bithumbBtc [-----[ {}", result.get(exchange));
                    CoinIndex coinIndex = new CoinIndex();
                }


//                coinIndex.setPriceKrw(priceKrw);
//                coinIndex.setPriceUsd(priceUsd);
//                coinIndex.setVariationValueForDay(result.get("price").get("change").get("absolute").decimalValue().setScale(0, RoundingMode.FLOOR));
//                coinIndex.setVariationRateForDay(result.get("price").get("change").get("percentage").decimalValue().multiply(new BigDecimal(100)).setScale(2, RoundingMode.FLOOR));
//                coinIndex.setTotalExcangeForDay(result.get("volume").decimalValue().setScale(2, RoundingMode.FLOOR));
            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForCryptowatch error [-----[ {}", e);
        }
        log.debug("]-----] makeCoinIndex::bithumbBtc [-----[ {}", bithumbBtc);

    }


}