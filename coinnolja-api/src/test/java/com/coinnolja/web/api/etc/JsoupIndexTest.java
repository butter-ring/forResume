package com.coinnolja.web.api.etc;

import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.board.BoardRepository;
import com.coinnolja.web.api.board.model.Board;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@ActiveProfiles("local")
public class JsoupIndexTest extends ApiApplicationTests {

    public static Logger log = LoggerFactory.getLogger(JsoupIndexTest.class);

    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void jsoupTest() {
        try {

            Document doc = Jsoup.connect("https://coinpan.com").get();
            Element newsHeadline = doc.select("table.coin_currency tr.exchange_bitflyer").first();


            log.debug("]-----] newsHeadlines [-----[ {}", newsHeadline);


        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }

}




