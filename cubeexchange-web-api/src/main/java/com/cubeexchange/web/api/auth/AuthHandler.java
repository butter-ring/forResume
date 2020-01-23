package com.cubeexchange.web.api.auth;

import com.cubeexchange.web.api.member.Member;
import com.cubeexchange.web.api.member.MemberRepository;
import com.cubeexchange.web.api.member.model.MemberSimple;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Slf4j
@Component
public class AuthHandler {

    private final MemberRepository memberRepository;

    public AuthHandler(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Mono<ServerResponse> signIn(ServerRequest request) {
        log.info("]-----] AuthHandler::signIn  [-----[ ");

        return request.principal()
                .map(p -> p.getName())
            .flatMap(username -> Mono.just(memberRepository.findByUsername(username)))
            .flatMap(member -> {
        member.setLastSigninAt(LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli());
        Member memberSaved = memberRepository.save(member);
        MemberSimple memberSimple = new MemberSimple();
        memberSimple.setUsername(memberSaved.getUsername());
        memberSimple.setLastSigninAt(memberSaved.getLastSigninAt());
        memberSimple.setNickName(memberSaved.getNickName());
        memberSimple.setAuthKeyactive(memberSaved.isAuthKeyactive());
        memberSimple.setAdmin(memberSaved.isAdmin());
        memberSimple.setId(memberSaved.getId());
        return Mono.just(memberSimple);
    })
            .flatMap(result -> ok().body(BodyInserters.fromObject(result)))
            .switchIfEmpty(notFound().build());
    }

    public Mono<ServerResponse> getAuthInfo(ServerRequest request) {
        log.info("]-----] AuthHandler::token call [-----[ ");

        return request.principal()
                .map(p -> p.getName())
                .flatMap(result -> ok().body(BodyInserters.fromObject(result)))
                .switchIfEmpty(status(401).build());

    }

}
