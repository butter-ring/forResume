package com.cubeexchange.web.api.auth;

import com.cubeexchange.web.api.auth.exception.UsernameNotFoundException;
import com.cubeexchange.web.api.member.Member;
import com.cubeexchange.web.api.member.MemberRepository;
import com.cubeexchange.web.api.member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class AuthService {


    private final AuthRepository authRepository;
    private final MemberRepository memberRepository;

    public AuthService(AuthRepository authRepository, MemberRepository memberRepository) {
        this.authRepository = authRepository;
        this.memberRepository = memberRepository;
    }

    public Mono<UserDetails> findByUsername(String username) {
        Auth auth = authRepository.findByUsernameAndActive(StringUtils.deleteWhitespace(username), 1);
        log.debug("]-----] AuthService::findByUsername [-----[ {}", auth);
        //(auth.getUsername());


        if (auth != null) {
            // OTP 인증 넣을 예정
//            Member member;
//            member = memberRepository.findByUsername(username);
//            member.isAuthKeyactive();
//            log.info("]-----] AuthService::isAuthKeyactive [-----[ {}", member.isAuthKeyactive());

            // OTP 인증 End

            return Mono.just((UserDetails) auth);
//            if (ValidStatus.DONE.equals(auth.getValidStatus())) {
//                return Mono.just((UserDetails) auth);
//            } else {
//                return Mono.error(new EmailValidNotYetException());
//            }
        } else {
            return Mono.error(new UsernameNotFoundException());

        }
    }

}
