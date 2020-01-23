package com.coinnolja.web.api.board;

import com.coinnolja.web.api.ApiApplicationTests;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.Assert.*;

@ActiveProfiles("local")
public class BoardServiceTest extends ApiApplicationTests {


    @Test
    public void findImage() {
        String content = "<p>asdfasdfasdf<img src='https://s3-ap-northeast-1.amazonaws.com/coinnolja-dev/board/20190604/20190604bMIlEGXPrXNgFpnFZVoyuuay.jpeg'>";
        int firstImgTag = StringUtils.indexOfIgnoreCase(content, "<img");
        log.debug("]-----] firstImgTag [-----[ {}", firstImgTag);
        if (firstImgTag > 0) {
//            String reduceString =
        }

        String all = "<img src=\"http://www.01net.com/images/article/mea/150.100.790233.jpg\""; // shortened it
        String s = "<img src=\"";
        int ix = all.indexOf(s) + s.length();
        log.debug("]-----] firstImgTag [-----[ {}", all.substring(ix, all.indexOf("\"", ix + 1)));
//        System.out.println(all.substring(ix, all.indexOf("\"", ix+1)));
    }

    @Test
    public void splitString() {
        String content = "ROLE_ADMIN|ROLE_USER";
        String[] list = StringUtils.splitByWholeSeparator(content, "|");
        log.debug("]-----] list [-----[ {}", list.length);
        log.debug("]-----] list [-----[ {}", list[0]);
        log.debug("]-----] list [-----[ {}", list[1]);
    }

}