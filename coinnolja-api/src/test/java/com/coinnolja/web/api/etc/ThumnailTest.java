package com.coinnolja.web.api.etc;

import org.imgscalr.Scalr;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public class ThumnailTest {

    public static Logger log = LoggerFactory.getLogger(ThumnailTest.class);


    @Test
    public void thumnailGifTest() {
        try {
            File tempFile = new File("/Users/cola/Downloads/tmp/20190612CKEtjfyXldZEegJxscgEJTIoHkeOdF.gif");
            log.debug("]-----] tempFile [-----[ {}", tempFile.length());
            if (tempFile.length() > 500000){

            }
            BufferedImage srcImg = ImageIO.read(tempFile);

            BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_WIDTH, srcImg.getWidth());
            File resultFile = new File("/Users/cola/Downloads/tmp/thumnail.gif");
            ImageIO.write(destImg, "gif", resultFile);
        } catch (Exception e) {
            log.error("]-----] e [-----[ {}", e);
        }

    }
}
