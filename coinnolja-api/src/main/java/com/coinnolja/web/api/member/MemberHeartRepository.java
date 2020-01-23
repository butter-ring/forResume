package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberHeart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberHeartRepository extends CrudRepository<MemberHeart, Long> {

    MemberHeart findByMemberIdAndTargetMemberId(Long memberId, Long targetMemberId);
}