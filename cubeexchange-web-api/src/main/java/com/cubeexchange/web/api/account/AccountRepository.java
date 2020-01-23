package com.cubeexchange.web.api.account;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {

    Account findByMemberIdAndCurrencyAndActive(Long memberId, String currency, int active);
}
