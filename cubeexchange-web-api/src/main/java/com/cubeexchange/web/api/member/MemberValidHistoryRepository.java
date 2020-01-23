package com.cubeexchange.web.api.member;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface MemberValidHistoryRepository extends CrudRepository<MemberValidationHistory, Long> {

    MemberValidationHistory findByValidString(String validString);

    MemberValidationHistory findByValidStringAndMemberIdAndActive(String validString, Long userId, int active);

    MemberValidationHistory findByMemberIdAndActive(Long memberId, int active);

    @Transactional
    @Modifying
    @Query(value = "UPDATE liter.user_validation_history SET active = 1 WHERE member_id = :memberId", nativeQuery = true)
    void updateAll(@Param("memberId") Long memberId);


}
