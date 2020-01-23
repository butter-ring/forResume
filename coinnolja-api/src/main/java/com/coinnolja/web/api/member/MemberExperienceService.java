package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.constant.ExperienceType;
import com.coinnolja.web.api.member.exception.ExperienceAlreadyExistsException;
import com.coinnolja.web.api.member.exception.MemberNotFoundException;
import com.coinnolja.web.api.member.model.Member;
import com.coinnolja.web.api.member.model.MemberExperience;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Slf4j
@Service
public class MemberExperienceService {

    private final MemberExperienceRepository memberExperienceRepository;
    private final MemberRepository memberRepository;

    public MemberExperienceService(
            MemberExperienceRepository memberExperienceRepository
            , MemberRepository memberRepository
    ) {
        this.memberExperienceRepository = memberExperienceRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Mono<Integer> putExperience(Long memberId, ExperienceType experienceType, String ipAddress) {
//        Optional<Member> memberOptional = memberRepository.findById(memberId);
//        if (!memberOptional.isPresent()) {
//            return Mono.error(new MemberNotFoundException());
//        }
        int exists = memberExperienceRepository.countExperienceBySecond(memberId);
        if (exists > 0) {
//            return Mono.error(new ExperienceAlreadyExistsException());
        } else {
            MemberExperience memberExperience = new MemberExperience();
            memberExperience.setMemberId(memberId);
            memberExperience.setExperience(experienceType.shout());
            memberExperience.setExperienceType(experienceType);
            memberExperience.setIpAddress(ipAddress);
            memberExperienceRepository.save(memberExperience);
            memberRepository.updatExperience(memberId, experienceType.shout());
        }

        return Mono.justOrEmpty(1);
    }
}
