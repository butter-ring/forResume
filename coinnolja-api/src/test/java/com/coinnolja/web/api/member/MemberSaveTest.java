package com.coinnolja.web.api.member;


import com.coinnolja.web.api.auth.AuthRole;
import com.coinnolja.web.api.auth.AuthRoleRepository;
import com.coinnolja.web.api.auth.Role;
import com.coinnolja.web.api.auth.RoleRepository;
import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.model.Member;
import com.coinnolja.web.api.member.model.MemberQna;
import com.coinnolja.web.api.member.model.MemberSimple;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("local")
public class MemberSaveTest {
    public static Logger log = LoggerFactory.getLogger(MemberSaveTest.class);

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthRoleRepository authRoleRepository;
    @Autowired
    private MemberQnaRepository memberQnaRepository;

    @Test
    public void saveTest() {
        Member member = new Member();
        Role role = new Role();
        AuthRole authRole = new AuthRole();

        member.setUsername("carmack");
        String encryptPassword = passwordEncoder.encode("1234");
        member.setPassword(encryptPassword);
        member.setNickName("carmacknick");
        member.setEmail("member@gmail.com");
        member.setGender(Gender.FEMALE);

        memberRepository.save(member);
        authRole.setRoleId(1L);
        authRole.setAuthId(1L);

        authRoleRepository.save(authRole);


    }

    @Test
    public void updateTest() {
        Member member;
        member = memberRepository.findById(4L).get();
        member.setLastSigninAt(LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli());
        memberRepository.save(member);
        log.debug("]-----] MemberSaveTest::updateTest [-----[ ", member);
    }

    @Test
    public void getInfoTest() {
        MemberSimple memberSimple = new MemberSimple();
        Member member;
        member = memberRepository.findById(4L).get();
        memberSimple.setNickName(member.getNickName());
        memberSimple.setMemberLevel(member.getMemberLevel());
        memberSimple.setMemberExperience(member.getMemberExperience());
        memberSimple.setMemberPoint(member.getMemberPoint());
        memberSimple.setProfileImageSmallUrl(member.getProfileImageSmallUrl());
        memberSimple.setProfileImageUrl(member.getProfileImageUrl());
        memberSimple.setStatus(member.getStatus());
        memberSimple.setUsername(member.getUsername());
        memberSimple.setValidStatus(member.getValidStatus());
        log.debug("]-----] MemberSaveTest::getInfoTest [-----[ ", memberSimple);
    }

    @Test
    public void infoUpdateTest() {
        Member member;
        member = memberRepository.findById(4L).get();
        member.setNickName("에에이");
        memberRepository.save(member);
        log.debug("]-----] MemberSaveTest::infoUpdateTest [-----[ ", member);
    }

    @Test
    public void passwordUpdateTest() {
        Member member;
        member = memberRepository.findById(4L).get();
        String encryptPassword = passwordEncoder.encode("1111");
        member.setPassword(encryptPassword);
        memberRepository.save(member);
    }

    @Test
    public void memberQnASaveTest() {
        MemberQna memberQnA = new MemberQna();
        memberQnA.setContent("문의합니다2");
        memberQnA.setTitle("문의타이틀입니다.2");
        memberQnA.setMemberId(4L);
        memberQnA.setCreatedAt(LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli());
        System.out.println("check1111-----------------------------" + memberQnA);
        memberQnaRepository.save(memberQnA);
    }

}
