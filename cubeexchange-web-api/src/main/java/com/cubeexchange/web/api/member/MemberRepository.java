package com.cubeexchange.web.api.member;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface MemberRepository extends CrudRepository<Member, Long> {

    Member findByUsername(String username);
    Member findByUsernameAndActive(String username, Integer active);

    boolean existsByNickName(String nickName);

    Member findByNickName(String nickName);

    Integer countAllByNickNameAndActive(String nickName, Integer active);


    @Transactional
    @Modifying
    @Query(value = "UPDATE cn_member SET valid_status = :validStatus WHERE id = :memberId", nativeQuery = true)
    Integer updateVlidStatus(@Param("memberId") Long memberId, @Param("validStatus") int validStatus);

}
