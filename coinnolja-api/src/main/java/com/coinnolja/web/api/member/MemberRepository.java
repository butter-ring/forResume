package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.constant.SnsType;
import com.coinnolja.web.api.member.model.Member;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MemberRepository extends CrudRepository<Member, Long> {

    Member findByUsername(String username);

    Member findByEmailAndActive(String email, int active);

    int countAllByEmailAndActive(String email, int active);


    Member findBySnsIdAndSnsType(String snsId, SnsType snsType);

    Integer countAllByNickNameAndActive(String nickName, Integer active);

    //Member findprofileImageUrlById(Long memberId);

    Integer countByUsername(String username);

    List findAllByNickNameAndActive(String nickName, Integer active);
    //List<Board> findAllByActive(int active) throws DataAccessException;

    @Transactional
    @Modifying
    @Query(value = "UPDATE member SET valid_status = :validStatus WHERE id = :memberId", nativeQuery = true)
    Integer updateVlidStatus(@Param("memberId") Long memberId, @Param("validStatus") int validStatus);


    boolean existsByNickName(String nickName);

    Member findByNickName(String nickName);

    Member findByPassword(String password);


    @Transactional
    @Modifying
    @Query(value = "UPDATE member SET member_experience = member_experience + :memberExperience WHERE id = :memberId", nativeQuery = true)
    Integer updatExperience(@Param("memberId") Long memberId, @Param("memberExperience") int memberExperience);


}