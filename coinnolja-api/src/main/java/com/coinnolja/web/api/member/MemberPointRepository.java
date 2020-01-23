package com.coinnolja.web.api.member;

import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.member.model.Member;
import com.coinnolja.web.api.member.model.MemberDevice;
import com.coinnolja.web.api.member.model.MemberPoint;
import com.coinnolja.web.api.member.model.MemberSimple;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MemberPointRepository extends CrudRepository<MemberPoint, Long> {

    List<MemberPoint> findAllByMemberIdAndActive(Long memberId,Integer active );

    List<MemberPoint> findAllByActive(Integer active);

   // MemberPoint findByMemberId(Long memberId);

   // List<MemberPoint> findTop10ByActiveOrderByCreatedAtAsc(int active);

    //SELECT mp.*, mm.nick_name from member_point mp left join member mm on mp.member_id=mm.id
    //where mp.created_at > UNIX_TIMESTAMP(DATE_ADD(curdate(), INTERVAL -1 DAY))*1000 and mp.active = 1 Order By mp.created_at ASC limit 10;



    //@Transactional  //업데이트시에 사용
    //@Modifying  //업데이트시에 사용

//    @Query(value = "SELECT mp.*, mm.nick_name as nick from member_point mp left join member mm on mp.member_id=mm.id \n" +
//            "where mp.created_at > UNIX_TIMESTAMP(DATE_ADD(curdate(), INTERVAL -1 DAY))*1000 and mp.active = 1 Order By mp.created_at ASC limit 10;", nativeQuery = true)
//

    @Query(value = "SELECT mp.*, mm.nick_name as nick from member_point mp left join member mm on mp.member_id=mm.id \n" +
            "where mp.attend_date = CURDATE() and mp.active = 1 Order By mp.created_at ASC limit 10;", nativeQuery = true)
    List<MemberPoint> findAllOrderByCreatedAtAsc();


    // @Query(value = "SELECT COUNT(member_id) from member_point where member_id = :memberId and created_at > UNIX_TIMESTAMP(DATE_ADD(curdate(), INTERVAL -1 DAY))*1000 and active = 1;", nativeQuery = true)

    @Query(value = "SELECT COUNT(member_id) from member_point where member_id = :memberId and attend_date = CURDATE() and active = 1;", nativeQuery = true)
    int countByMemberId(@Param("memberId") Long memberId);

    //MemberPoint findByMemberId(@Param("memberId") Long memberId, @Param("active") Integer active);

}

