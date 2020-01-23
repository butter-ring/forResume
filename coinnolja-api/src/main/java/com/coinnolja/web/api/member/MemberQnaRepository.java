package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberQna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberQnaRepository extends CrudRepository<MemberQna, Long> {
     // Page<MemberQna> findAllByMemberIdAndOrderByCreatedAtDesc (Pageable pageable, Long memberId);
     Page<MemberQna> findAllByMemberId(Pageable pageable, Long memberId);
     // List<MemberQna> findAllByMemberId(Long memberId);
     Page<MemberQna> findAll(Pageable pageable);
}
