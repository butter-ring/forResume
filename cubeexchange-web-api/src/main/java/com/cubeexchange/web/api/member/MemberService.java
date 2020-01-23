package com.cubeexchange.web.api.member;

import com.cubeexchange.web.api.auth.AuthRole;
import com.cubeexchange.web.api.auth.AuthRoleRepository;
import com.cubeexchange.web.api.auth.Role;
import com.cubeexchange.web.api.auth.RoleRepository;
import com.cubeexchange.web.api.auth.constant.RoleEnum;
import com.cubeexchange.web.api.member.exception.MemberNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Slf4j
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final AuthRoleRepository authRoleRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(
            MemberRepository memberRepository
            , RoleRepository roleRepository
            , AuthRoleRepository authRoleRepository
            , PasswordEncoder passwordEncoder
    ) {
        this.memberRepository = memberRepository;
        this.roleRepository = roleRepository;
        this.authRoleRepository = authRoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Mono<Member> signup(Member member) throws DataAccessException {
        log.debug("]-----] MemberService::signup.memberSignup [-----[ {}", member);
        if(member.getUsername()!=null && member.getPassword()!=null) {
            memberRepository.save(member);
            Optional<Member> memberOptional = memberRepository.findById(member.getId());
            if(!memberOptional.isPresent()) {
                return Mono.error(new MemberNotFoundException());
            }
        }
        Role role = roleRepository.findByRole(RoleEnum.GUEST.getCode());
        log.debug("]-----] MemberHandler::signup.role [-----[ {}", role);
        AuthRole authRole = new AuthRole();
        authRole.setAuthId(member.getId());
        authRole.setRoleId(role.getId());
        if(authRole.getAuthId()!=null && authRole.getRoleId()!=null) {
            // role 저장
            authRoleRepository.save(authRole);
            Optional<AuthRole> authRoleOptional = authRoleRepository.findById(authRole.getAuthId());
            if(!authRoleOptional.isPresent()) {
                return Mono.error(new MemberNotFoundException());
            }
        }
       return Mono.just(member);
    }
}
