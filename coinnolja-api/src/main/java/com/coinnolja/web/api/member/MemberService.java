package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.exception.EmailNotValidException;
import com.coinnolja.web.api.member.exception.UserEmailIsEmptyException;
import com.coinnolja.web.api.member.exception.UserEmailIsNotFoundException;
import com.coinnolja.web.api.member.model.Member;
import com.coinnolja.web.api.member.view.MemberSignup;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class  MemberService {

    private final MemberRepository memberRepository;
    private final MemberValidation memberValidation;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository
            , MemberValidation memberValidation,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.memberValidation = memberValidation;
        this.passwordEncoder = passwordEncoder;
    }

    public Mono<Member> signupSns(MemberSignup memberSignup) throws DataAccessException {
        log.debug("]-----] MemberService::signupSns.memberSignup [-----[ {}", memberSignup);
        Member member = new Member();
        member.setUsername(memberSignup.getSnsId());
        member.setSnsId(memberSignup.getSnsId());
        member.setSnsType(memberSignup.getSnsType());
        member.setGender(Gender.MALE);

        Member memberExists = memberRepository.findBySnsIdAndSnsType(memberSignup.getSnsId(), memberSignup.getSnsType());
        log.debug("]-----] MemberService::signupSns.member1 [-----[ {}", member);
//        Mono<Member> memberExists = Mono.justOrEmpty(memberRepository.findBySnsIdAndSnsType(memberSignup.getSnsId(), memberSignup.getSnsType()));

        return Mono.justOrEmpty(memberExists)
                .map(m -> {
                    log.debug("]-----] MemberService::signupSns.member2 [-----[ {}", m);
                    return m;
                })
                .onErrorResume(e -> Mono.just(memberRepository.save(member)));

    }

    @Transactional
    public Mono<Integer> findMyInfo(MemberSignup memberSignup) throws DataAccessException {
        log.debug("]-----] MemberService::findMyInfo [-----[ {}", memberSignup);
        String email = memberSignup.getEmail();
        if (StringUtils.isBlank(email)) {
            return Mono.error(new UserEmailIsEmptyException());
        }
        if (!memberValidation.validateEmail(email)) {
            return Mono.error(new EmailNotValidException());
        }
        Member member = memberRepository.findByEmailAndActive(email, 1);

        if (member != null) {

            String passwordNew = RandomStringUtils.randomAlphabetic(8);
            String encryptPassword = passwordEncoder.encode(passwordNew);
            member.setPassword(encryptPassword);
            memberRepository.save(member);

            memberSignup.setUsername(member.getUsername());
            memberSignup.setPassword(passwordNew);
            memberValidation.findMyInfoEmailSend(memberSignup);
            return Mono.justOrEmpty(0);
        } else {
            return Mono.error(new UserEmailIsNotFoundException());
        }

    }


}
