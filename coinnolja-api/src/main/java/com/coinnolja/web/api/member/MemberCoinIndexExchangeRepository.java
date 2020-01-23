package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberCoinIndexExchange;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MemberCoinIndexExchangeRepository extends CrudRepository<MemberCoinIndexExchange, Long> {

    List<MemberCoinIndexExchange> findAllByMemberId(Long memberId);
    List<MemberCoinIndexExchange> findAllByMemberIdAndSelected(Long memberId, boolean selected);

    @Modifying
    @Transactional
    @Query(value = "delete from member_coin_index_exchange where member_id = :memberId", nativeQuery = true)
    void deleteAllByMemberId(@Param("memberId") Long memberId);
}