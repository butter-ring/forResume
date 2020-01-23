package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberExperience;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberExperienceRepository extends CrudRepository<MemberExperience, Long> {

    @Query(value = "select count(*) from member_experience where member_id = :memberId  and created_at  >= UNIX_TIMESTAMP(date_sub(CURRENT_TIMESTAMP(), interval 30 second)) * 1000", nativeQuery = true)
    int countExperienceBySecond(@Param("memberId") Long memberId);

    Page<MemberExperience> findAllByMemberId(Pageable pageable, @Param("memberId") Long memberId);

}