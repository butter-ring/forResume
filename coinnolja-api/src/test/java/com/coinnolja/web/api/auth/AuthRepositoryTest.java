package com.coinnolja.web.api.auth;

import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.member.MemberRepository;
import com.coinnolja.web.api.member.model.Member;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("local")
public class AuthRepositoryTest extends ApiApplicationTests {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthRoleRepository authRoleRepository;


    @Test
    public void saveTest() {
        Member member = new Member();
        member.setUsername("test001");
        member.setPassword("$2a$10$BujuNOQk0YCaIZ/jQj.VgO3zUsNmNqIscAIDtOcDgreQmzu4xqaYS");
        member.setMemberPoint(0);
        member.setMemberExperience(0);
        memberRepository.save(member);

        Role roleAdmin = new Role();
        roleAdmin.setRole("ADMIN");
        roleRepository.save(roleAdmin);

        Role roleUser = new Role();
        roleUser.setRole("USER");

        roleRepository.save(roleUser);

        AuthRole authRoleAdmin = new AuthRole();
        authRoleAdmin.setRoleId(roleAdmin.getId());
        authRoleAdmin.setAuthId(member.getId());
        authRoleRepository.save(authRoleAdmin);

        AuthRole authRoleUser = new AuthRole();
        authRoleUser.setRoleId(roleUser.getId());
        authRoleUser.setAuthId(member.getId());
        authRoleRepository.save(authRoleUser);

    }


}