package com.coinnolja.web.api.member;

import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.auth.AuthRole;
import com.coinnolja.web.api.auth.Role;
import com.coinnolja.web.api.auth.RoleRepository;
import com.coinnolja.web.api.auth.constant.RoleEnum;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.member.constant.PointGetType;
import com.coinnolja.web.api.member.constant.PointSpentType;
import com.coinnolja.web.api.member.model.Member;
import com.coinnolja.web.api.member.model.MemberNote;
import com.coinnolja.web.api.member.model.MemberPoint;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.Assert.*;

@ActiveProfiles("local")
public class MemberRepositoryTest extends ApiApplicationTests {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberNoteRepository memberNoteRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MemberPointRepository memberPointRepository;

    @Test
    public void countAllByNickNameAndActive() {
        log.debug("]-----] countAllByNickNameAndActive [-----[ {}", memberRepository.countAllByNickNameAndActive("1", 1));

    }

    @Test
    public void findAllByNickNameAndActive() {
       // log.debug("]-----] findAllByNickNameAndActive [-----[ {}", memberPointRepository.findAllByNickNameAndActive("carmack", 1));
    }


    @Test
    public void readTest() {
       //log.debug("]-----] readTest [-----[ {}", memberRepository.findByUsername("carmack2").getId()  );
       log.debug("]-----] readTest [-----[ {}", (memberRepository.findById(Long.valueOf(1))));



//        Long boardMasterId = request.queryParam("boardMasterId").isPresent() ? Long.parseLong(request.queryParam("boardMasterId").get()) : 1;
//        Paging paging = new Paging();
//        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 1;
//
//        Integer pageSize = request.queryParam("pageSize").isPresent() ? Integer.parseInt(request.queryParam("pageSize").get()) : 16;
//        paging.setPageIndex(page);
//        paging.setPageSize(pageSize);
//
//        return boardService.findAll(paging, boardMasterId);

    }

    @Test
    public void encycloppw() {
        String password = "1234";
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        //$2a$10$HD6tDRhllRXuK1KmpvtPWuetXq61uT.iuoi.TN7zIMrm48/HzkbrK
        log.info(password);
        log.info(hashedPassword);

    }

    @Test
    public void saveTest() {
    }
}