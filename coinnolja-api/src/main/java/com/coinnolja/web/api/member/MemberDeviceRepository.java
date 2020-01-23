package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberDevice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberDeviceRepository extends CrudRepository<MemberDevice, Long> {

    List<MemberDevice> findAllByMemberId(Long memberId);

    MemberDevice findByMemberIdAndNotipicationToken(Long memberId, String notipicationToken);

}