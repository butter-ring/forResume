package com.coinnolja.web.api.exchange;

import com.coinnolja.web.api.ApiApplicationTests;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.Assert.*;

@ActiveProfiles("local")
public class ExchangeRateRepositoryTest extends ApiApplicationTests {

    @Autowired
    private ExchangeRateRepository exchangeRateRepository;

    @Test
    public void findFirstOrderByCreatedAtDesc() {

        ExchangeRate exchangeRate = exchangeRateRepository.findFirstByOrderByCreatedAtDesc();
        log.debug("]-----] exchangeRate [-----[ {}", exchangeRate);
    }
}