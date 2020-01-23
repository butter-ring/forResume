
package com.coinnolja.web.api.member;

import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.member.MemberService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.Assert.*;

@ActiveProfiles("local")
public class MemberServiceTest extends ApiApplicationTests {

    @Autowired
    private MemberService memberService;

    @Test
    public void recapchaTest(){
//        memberService.siteverify();
    }

}

