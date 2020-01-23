package com.coinnolja.web.api.exchange;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeRateRepository extends CrudRepository<ExchangeRate, Long> {

    @Cacheable("exchange.exchangerate")
    ExchangeRate findFirstByOrderByCreatedAtDesc();
}