package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberSimple;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberSimpleRepository extends CrudRepository<MemberSimple, Long> {


}