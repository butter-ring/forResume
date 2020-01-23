package com.cubeexchange.web.api.coingecko;

import com.cubeexchange.web.api.CubeexchangeWebApiApplicationTests;
import org.junit.Test;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

@ActiveProfiles("local")
public class CoingeckoTest extends CubeexchangeWebApiApplicationTests {


    @Test
    public void getCoingeckoTest() {
        WebTestClient.bindToServer().baseUrl("https://api.coingecko.com/api/v3/")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder.path("/coins/markets/")
                        .queryParam("vs_currency", "krw").build())
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(CoinMarkets.class);
    }

}
