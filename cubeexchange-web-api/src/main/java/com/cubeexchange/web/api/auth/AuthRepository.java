package com.cubeexchange.web.api.auth;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends CrudRepository<Auth, Long> {

    Auth findByUsername(String username);


    Auth findByUsernameAndActive(String username, int active);
    Auth findByIdAndActive(Long memberId, int active);
}