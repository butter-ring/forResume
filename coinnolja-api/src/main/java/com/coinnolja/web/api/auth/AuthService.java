package com.coinnolja.web.api.auth;

import com.coinnolja.web.api.auth.exception.UsernameNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class AuthService {


    private final AuthRepository authRepository;

    public AuthService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    public Mono<UserDetails> findByUsername(String username) {
        Auth auth = authRepository.findByUsernameAndActive(StringUtils.deleteWhitespace(username), 1);
        log.debug("]-----] AuthService::findByUsername [-----[ {}", auth);
        //(auth.getUsername());


        if (auth != null) {
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
