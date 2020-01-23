package com.cubeexchange.web.api.auth;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRoleRepository extends CrudRepository<AuthRole, Long> {
    AuthRole findByAuthIdAndActive (Long memberId, int active);

}