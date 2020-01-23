package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberPartnership;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPartnershipRepository extends CrudRepository<MemberPartnership, Long> {



}

