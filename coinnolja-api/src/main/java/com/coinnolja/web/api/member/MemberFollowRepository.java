package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberFollow;
import com.coinnolja.web.api.member.model.MemberHeart;
import com.coinnolja.web.api.member.model.MemberNote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberFollowRepository extends CrudRepository<MemberFollow, Long> {

    MemberFollow findByMemberIdAndTargetMemberId(Long memberId, Long targetMemberId);

    int countAllByMemberIdAndTargetMemberId(Long memberId, Long targetMemberId);

    Page<MemberFollow> findAllByMemberIdOrderByTargetMemberIdAsc(Pageable pageable, Long MemberId);
}