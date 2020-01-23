package com.cubeexchange.trade.account;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

public interface AccountRepository extends CrudRepository<Account, Long> {

    Account findByMemberIdAndCurrencyAndActive(Long memberId, String currency, int active);

    @Transactional
    @Modifying
    @Query(value = "update Account set availableBalance = availableBalance + :amount where memberId = :memberId and currency = :currency and active = 1")
    void updateBalanceByMemberIdAndCurrency(@Param("amount") BigDecimal amount, @Param("memberId") Long memberId, @Param("currency") String currency);
}
