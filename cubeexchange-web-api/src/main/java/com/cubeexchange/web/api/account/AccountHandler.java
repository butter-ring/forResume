package com.cubeexchange.web.api.account;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class AccountHandler {

    private final AccountRepository accountRepository;
    
    public AccountHandler(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /**
     * GET a Account
     */
    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    public Mono<ServerResponse> findByCurrency(ServerRequest request) {
        log.info("]-----] AccountHandler::findByCurrency call [-----[ ");
        String currency = request.pathVariable("currency");
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.justOrEmpty(accountRepository.findByMemberIdAndCurrencyAndActive(memberId, currency, 1)))
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    }


}
