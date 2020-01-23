package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.exception.FollowAlreadyExistsException;
import com.coinnolja.web.api.member.exception.UserNameIsAlreadyExistsException;
import com.coinnolja.web.api.member.model.MemberFollow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class MemberFollowService {

    private final MemberFollowRepository memberFollowRepository;

    public MemberFollowService(MemberFollowRepository memberFollowRepository) {
        this.memberFollowRepository = memberFollowRepository;
    }

//    @Transactional
//    public Mono<MemberFollow> follow(MemberFollow memberFollow) {
//        log.debug("]-----] MemberFollowService::follow.memberFollow [-----[ {}", memberFollow);
//        int existsCount = memberFollowRepository.countAllByMemberIdAndTargetMemberId(memberFollow.getMemberId(), memberFollow.getTargetMemberId());
//        if (existsCount > 0) {
//            log.debug("]-----] 111111111111 [-----[ ");
//            return Mono.error(new FollowAlreadyExistsException());
//        }
//        return Mono.justOrEmpty(memberFollow);
//    }

    @Transactional
    public Mono<MemberFollow> followSave(MemberFollow memberFollow) throws DataAccessException {
        log.debug("]-----] MemberFollowService::follow.memberFollow [-----[ {}", memberFollow);
        int existsCount = memberFollowRepository.countAllByMemberIdAndTargetMemberId(memberFollow.getMemberId(), memberFollow.getTargetMemberId());
        if (existsCount > 0) {
            return Mono.error(new FollowAlreadyExistsException());
        } else {

            log.debug("]-----] 222222222222 [-----[ ");
            memberFollowRepository.save(memberFollow);
        }
        log.debug("]-----] 333333333333 [-----[ ");
        return Mono.justOrEmpty(memberFollow);
    }

//    @Transactional
//    public Mono<MemberFollow> followDelete(MemberFollow memberFollow) throws DataAccessException {
//        log.debug("]-----] MemberFollowService::heartDelete.targetId [-----[ ");
//        MemberFollow memberFollowExists = memberFollowRepository.findByMemberIdAndTargetMemberId(memberFollow.getMemberId(),memberFollow.getTargetMemberId());
//        memberFollowRepository.delete(memberFollowExists);
//        // return Mono.justOrEmpty(memberFollowExists);
//        return Mono.error(new UserNameIsAlreadyExistsException());
//
//    }


}
