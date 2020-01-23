package com.coinnolja.web.api.etc;

import org.apache.commons.lang3.RegExUtils;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StringUtilsTest {
    public static Logger log = LoggerFactory.getLogger(StringUtilsTest.class);

    @Test
    public void regexTest(){

        String test = RegExUtils.removeAll("111,111,111,111.22", ",");
        log.debug("]-----] test [-----[ {}", test);
    }
}
