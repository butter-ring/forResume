package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberCoinSchedule;
import com.coinnolja.web.api.member.model.MemberNote;
import com.coinnolja.web.api.member.model.MemberPoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberCoinScheduleRepository extends CrudRepository<MemberCoinSchedule, Long> {

    // 코인 일정 목록 가져오기.
    List<MemberCoinSchedule> findAllByActive(Integer active);
}

