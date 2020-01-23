package com.coinnolja.web.api.etc;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

//@ActiveProfiles("local")
public class LocalTimeTest {

    public static Logger log = LoggerFactory.getLogger(LocalTimeTest.class);


    @Test
    public void jsoupTest() {


        log.debug("]-----] localtime [-----[ {}", LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        log.debug("]-----] localtime [-----[ {}", LocalDateTime.now(ZoneId.of("Asia/Seoul")).toEpochSecond(ZoneOffset.UTC));
        log.debug("]-----] localtime [-----[ {}", LocalDateTime.now(ZoneId.of("Asia/Seoul")).toEpochSecond(ZoneOffset.ofTotalSeconds(32400)));


    }

}
