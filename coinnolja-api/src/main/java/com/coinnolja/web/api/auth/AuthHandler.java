package com.coinnolja.web.api.auth;

import com.coinnolja.web.api.member.MemberRepository;
import com.coinnolja.web.api.member.model.Member;
import com.coinnolja.web.api.member.model.MemberSimple;
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

                //username을 가져온다.
                .map(p -> p.getName())

                //가져 온 username으로 멤버의 정보를 가져온다.
                .flatMap(username -> Mono.just(memberRepository.findByUsername(username)))

                //멤버의 마지막 로그인 정보를 업데이트한다.
                .flatMap(member -> {
                    member.setLastSigninAt(LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli());
                    Member memberSaved = memberRepository.save(member);
                    MemberSimple memberSimple = new MemberSimple();
                    memberSimple.setUsername(memberSaved.getUsername());
                    memberSimple.setNickName(memberSaved.getNickName());
                    memberSimple.setStatus(memberSaved.getStatus());
                    memberSimple.setProfileImageUrl(memberSaved.getProfileImageUrl());
                    memberSimple.setProfileImageSmallUrl(memberSaved.getProfileImageSmallUrl());
                    memberSimple.setMemberLevel(memberSaved.getMemberLevel());
                    memberSimple.setMemberExperience(memberSaved.getMemberExperience());
                    memberSimple.setMemberPoint(memberSaved.getMemberPoint());
                    memberSimple.setId(memberSaved.getId());
                    memberSimple.setValidStatus(memberSaved.getValidStatus());
                    memberSimple.setAdmin(memberSaved.isAdmin());
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
