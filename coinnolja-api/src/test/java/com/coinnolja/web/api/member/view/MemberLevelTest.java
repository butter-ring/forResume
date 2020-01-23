package com.coinnolja.web.api.member.view;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MemberLevelTest {

    public static Logger log = LoggerFactory.getLogger(MemberLevelTest.class);

    @Test
    public void getLevelTest() {
        MemberLevel memberLevel = new MemberLevel(130, false);
        log.debug("]-----] memberLevel [-----[ {}", memberLevel);
        log.debug("]-----] memberLevel [-----[ {}", new MemberLevel(1900, false).memberLevel);
    }
}