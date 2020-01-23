package com.coinnolja.web.api.etc;

import com.amazonaws.services.s3.transfer.TransferManager;
import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.auth.AuthRole;
import com.coinnolja.web.api.auth.AuthRoleRepository;
import com.coinnolja.web.api.auth.Role;
import com.coinnolja.web.api.auth.RoleRepository;
import com.coinnolja.web.api.auth.constant.RoleEnum;
import com.coinnolja.web.api.board.BoardRepository;
import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.member.MemberRepository;
import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.model.Member;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.imgscalr.Scalr;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//@ActiveProfiles("local")
public class JsoupTest extends ApiApplicationTests {

    public static Logger log = LoggerFactory.getLogger(JsoupTest.class);

    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void jsoupTest() {
        try {

            Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=btc&page=20").get();
            Elements newsHeadlines = doc.select("div.board_list table tbody tr");
            List<Board> boards = new ArrayList<>();
            for (Element headline : newsHeadlines) {

                String noticeYn = headline.selectFirst("tr").className();
                if (!StringUtils.contains(noticeYn, "notice")) {

                    String dtailUrl = headline.select(".title a").attr("href");
                    Document docDetail = Jsoup.connect("https://coinpan.com" + dtailUrl).get();
                    Elements detailBody = docDetail.select("div.read_body .xe_content");
                    Elements remove = detailBody.select("div.wgtRv");
                    detailBody.remove(remove);
                    String detailHead = docDetail.select("div.read_header a").text();
                    Board board = new Board();
                    board.setMemberId(6l);
                    board.setContent(detailBody.html());
                    board.setTitle(detailHead);
                    board.setBoardMasterId(10l);
                    boards.add(board);
                }

            }
            log.debug("]-----] boards [-----[ {}", boards.get(0));
            Collections.reverse(boards);
            log.debug("]-----] boards reverse[-----[ {}", boards.get(0));
            boardRepository.saveAll(boards);
        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }

    //    @Value("${path.file.tmp}")
    private String tempFilePath = "/Users/cola/Downloads/tmp/";

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Value("${aws.bucket.url}")
    private String bucketUrl;


    @Autowired
    private TransferManager transferManager;

    @Test
    public void loopTest() {
        for (int i = 19; i >= 1; i--) {
            log.debug("]-----] imageUrl [-----[ {}", i);
        }
    }

    @Test
    public void jsoupImageTest() {
        try {

//            for (int i = 19; i >= 0; i--) {


            Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=star_gallery&page=8").get();
//            log.debug("]-----] count [-----[ {}", i);
            Elements newsHeadlines = doc.select("ul.sq_gallery li");
            List<Board> boards = new ArrayList<>();
            for (Element headline : newsHeadlines) {


                String dtailUrl = headline.select("a").attr("href");
                log.debug("]-----] dtailUrl [-----[ {}", dtailUrl);
                Document docDetail = Jsoup.connect("https://coinpan.com" + dtailUrl).get();

                Element detailBody = docDetail.select("div.read_body div.xe_content").first();
//                log.debug("]-----] detailBody [-----[ {}", detailBody);
                Element imageEm = detailBody.select("img").first();
                if (imageEm != null) {
//                    log.debug("]-----] imageUrl [-----[ {}", imageEm);
//                    Elements remove = detailBody.select("div.wgtRv");
//                    detailBody.remove(remove);
                    String detailHead = docDetail.select("div.read_header a").text();


                    String thumnailUrl = headline.select("span.thum_span img").attr("src");

//                    log.debug("]-----] thumnailUrl [-----[ {}", thumnailUrl);

                    String imageUrl = "";
                    InputStream in = new URL(thumnailUrl).openStream();
                    String imageExt = StringUtils.defaultIfBlank(getFileExtension(thumnailUrl), "");
//                    if (!"gif".equals(imageExt)) {
                    String path = "board/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                    String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(24);
                    String modifyName = collectionUuid + "." + imageExt;
                    Files.copy(in, Paths.get("/Users/cola/Downloads/tmp/" + modifyName), StandardCopyOption.REPLACE_EXISTING);
                    File tempFile = new File("/Users/cola/Downloads/tmp/" + modifyName);


                    String imglUrlBody = "https://coinpan.com" + imageEm.attr("src");
                    String imageUrlBody = "";
                    InputStream inBody = new URL(imglUrlBody).openStream();
                    String imageExtBody = StringUtils.defaultIfBlank(getFileExtension(imglUrlBody), "");
//                    if (!"gif".equals(imageExt)) {
//                    String pathBody = "board/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                    String collectionUuidBody = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(24);
                    String modifyNameBody = collectionUuidBody + "." + imageExtBody;
                    Files.copy(inBody, Paths.get("/Users/cola/Downloads/tmp/" + modifyNameBody), StandardCopyOption.REPLACE_EXISTING);
                    File tempFileBody = new File("/Users/cola/Downloads/tmp/" + modifyNameBody);


                    List<File> fileList = new ArrayList<>();
                    try {

                        fileList.add(tempFile);
                        fileList.add(tempFileBody);
                        imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyName;
                        imageUrlBody = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyNameBody;
                        detailBody.select("img").first().attr("src", imageUrlBody);
                        transferManager.uploadFileList(bucketName, path, new File(tempFilePath), fileList).waitForCompletion();
                        if (StringUtils.isNotBlank(imageUrl)) {
                            Board board = new Board();
                            board.setMemberId(1l);
                            board.setContent(detailBody.html());
                            board.setTitle(detailHead);
                            board.setBoardMasterId(16l);
                            board.setThumnailUrl(imageUrl);
                            boards.add(board);
                        }

                    } catch (Exception e) {

                    }

                }

//                }
//                log.debug("]-----] imageUrl [-----[ {}", imageUrl);

//                    log.debug("]-----] boards [-----[ {}", boards.get(0));

//                    log.debug("]-----] boards reverse[-----[ {}", boards.get(0));

//                }

            }
            Collections.reverse(boards);
            boardRepository.saveAll(boards);
        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }

    @Test
    public void downloadImage() throws MalformedURLException, IOException, FileNotFoundException {

        String url = "https://coinpan.com/files/attach/images/313/263/343/143/45fd59d28344fe1567a478efde861968.jpeg";
        try {
            InputStream in = new URL(url).openStream();
            String imageExt = StringUtils.defaultIfBlank(getFileExtension(url), "");
            String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(24);
            String modifyName = collectionUuid + "." + imageExt;
            Files.copy(in, Paths.get("/Users/cola/Downloads/tmp/" + modifyName), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            String extRaw = fileName.substring(fileName.lastIndexOf(".") + 1);
            if (extRaw.indexOf("?") > -1) {
                return extRaw.substring(0, extRaw.indexOf("?"));
            } else {
                return fileName.substring(fileName.lastIndexOf(".") + 1);
            }

        } else {
            return null;
        }
    }

    @Test
    public void loginTest() {
        try {
//            Connection.Response res = Jsoup.connect("http://localhost:8080/bbs/login_check.php")
//                    .data("mb_id", "admin", "mb_password", "1111")
//                    .method(Connection.Method.POST)
//                    .execute();
//
//            String sessionId = res.cookie("PHPSESSID");
//            log.error("]-----] sessionId [-----[ {}", sessionId);
//            Document doc = res.parse();
//            log.error("]-----] doc [-----[ {}", doc);


            Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=coin_info&page=30&document_srl=140302033")
                    .ignoreContentType(true)
                    .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                    .cookie("PHPSESSID", "d9a8d0a851ff6492cf7c410c72f7acac")
                    .get();

            Element detailBody = doc.select("div.read_body div.xe_content").first();
            log.error("]-----] detailBody [-----[ {}", detailBody);

        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthRoleRepository authRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void infoTest() {
        try {

            for (int i = 29; i >= 0; i--) {

                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=coin_info&page=" + i)
                        .ignoreContentType(true)
                        .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                        .cookie("PHPSESSID", "d9a8d0a851ff6492cf7c410c72f7acac")
                        .get();
                Elements newsHeadlines = doc.select("div.board_list table tbody tr");
                List<Board> boards = new ArrayList<>();
                for (Element headline : newsHeadlines) {

                    String noticeYn = headline.selectFirst("tr").className();
                    if (!StringUtils.contains(noticeYn, "notice")) {

                        String dtailUrl = headline.select(".title a").attr("href");
                        String nickName = headline.select(".author a").text();
                        log.debug("]-----] username [-----[ {}", nickName);
                        Member member = memberRepository.findByNickName(nickName);
                        Long meberId = null;
                        if (member == null) {
                            Member newMwmber = new Member();
                            newMwmber.setRealName(nickName);
                            newMwmber.setUsername(RandomStringUtils.randomAlphanumeric(8).toLowerCase());
                            newMwmber.setPassword(passwordEncoder.encode("qwer1234T"));
                            newMwmber.setEmail(RandomStringUtils.randomAlphanumeric(9).toLowerCase() + "@reward.com");
                            newMwmber.setGender(Gender.MALE);
                            newMwmber.setNickName(nickName);
                            memberRepository.save(newMwmber);

                            Role role = roleRepository.findByRole(RoleEnum.USER.getCode());
                            AuthRole authRole = new AuthRole();
                            authRole.setAuthId(newMwmber.getId());
                            authRole.setRoleId(role.getId());
                            authRoleRepository.save(authRole);

                            meberId = newMwmber.getId();
                        } else {
                            meberId = member.getId();
                        }


                        Document docDetail = Jsoup.connect("https://coinpan.com" + dtailUrl)
                                .ignoreContentType(true)
                                .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                                .cookie("PHPSESSID", "d9a8d0a851ff6492cf7c410c72f7acac")
                                .get();

                        Elements detailBody = docDetail.select("div.read_body .xe_content");
                        Elements remove = detailBody.select("div.wgtRv");
                        detailBody.remove(remove);
                        String detailHead = docDetail.select("div.read_header a").text();
                        Board board = new Board();
                        board.setMemberId(meberId);
                        board.setContent(detailBody.html());
                        board.setTitle(detailHead);
                        board.setBoardMasterId(1l);
                        boards.add(board);
                    }

                }
//            log.debug("]-----] boards [-----[ {}", boards.get(0));
                Collections.reverse(boards);
                log.debug("]-----] boards reverse[-----[ {}", boards.get(0));
                boardRepository.saveAll(boards);
            }
        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }


    @Test
    public void infoTest2() {
        try {
//            for (int i = 9; 1 >= 0; i--) {

            Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=coin_info&page=1")
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=free&page="+i)
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=btc&page="+i)
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=humor&page=" + i)
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=ltc&page=" + i)
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=bsv&page=" + i)
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=pnl&page=" + i)
//                Document doc = Jsoup.connect("https://coinpan.com/index.php?mid=greet&page="+i )
                    .ignoreContentType(true)
                    .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                    .cookie("PHPSESSID", "213579c9b146fd7b044ff81fa85a9df6")
                    .get();
            Elements newsHeadlines = doc.select("div.board_list table tbody tr");
            List<Board> boards = new ArrayList<>();
            for (Element headline : newsHeadlines) {
                try {


                    String noticeYn = headline.selectFirst("tr").className();
                    if (!StringUtils.contains(noticeYn, "notice")) {

                        String dtailUrl = headline.select(".title a").attr("href");
                        String titleHead = headline.select(".title .category").text();
                        log.debug("]-----] titleHead [-----[ {}", titleHead);
//                    log.debug("]-----] titleHead [-----[ {}", titleHead.replaceAll("[|]", ""));
                        String nickName = headline.select(".author a").text();
                        log.debug("]-----] username [-----[ {}", nickName);
                        Member member = memberRepository.findByNickName(nickName);
                        Long meberId = null;
                        if (member == null) {
                            Member newMwmber = new Member();
                            newMwmber.setRealName(nickName);
                            newMwmber.setUsername(RandomStringUtils.randomAlphanumeric(8).toLowerCase());
                            newMwmber.setPassword(passwordEncoder.encode("qwer1234T"));
                            newMwmber.setEmail(RandomStringUtils.randomAlphanumeric(9).toLowerCase() + "@reward.com");
                            newMwmber.setGender(Gender.MALE);
                            newMwmber.setNickName(nickName);
                            memberRepository.save(newMwmber);

                            Role role = roleRepository.findByRole(RoleEnum.USER.getCode());
                            AuthRole authRole = new AuthRole();
                            authRole.setAuthId(newMwmber.getId());
                            authRole.setRoleId(role.getId());
                            authRoleRepository.save(authRole);

                            meberId = newMwmber.getId();
                        } else {
                            meberId = member.getId();
                        }


                        Document docDetail = Jsoup.connect("https://coinpan.com" + dtailUrl)
                                .ignoreContentType(true)
                                .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                                .cookie("PHPSESSID", "213579c9b146fd7b044ff81fa85a9df6")
                                .get();

                        Elements detailBody = docDetail.select("div.read_body .xe_content");


                        Elements remove = detailBody.select("div.wgtRv");
                        detailBody.remove(remove);
                        String detailHead = docDetail.select("div.read_header a").text();
                        Board board = new Board();


                        Elements hasImgs = detailBody.select("img");
                        if (hasImgs.size() > 0) {
                            log.debug("]-----] size [-----[ {}", hasImgs.size());
                            List<File> fileList = new ArrayList<>();
                            Element hasImg = detailBody.select("img").first();
                            String path = "board/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                            if (hasImg != null) {
                                board.setHasImage(true);
                                String thumnailUrl = hasImg.attr("src");
                                if (!thumnailUrl.startsWith("http")) {
                                    thumnailUrl = "https://coinpan.com" + hasImg.attr("src");
                                }

                                log.debug("]-----] thumnailUrl [-----[ {}", thumnailUrl);
                                InputStream in = new URL(thumnailUrl).openStream();
                                String imageExt = StringUtils.defaultIfBlank(getFileExtension(thumnailUrl), "");

                                String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(30);
                                String modifyName = collectionUuid + "." + imageExt.toLowerCase();
                                Files.copy(in, Paths.get(tempFilePath + modifyName), StandardCopyOption.REPLACE_EXISTING);
                                File tempFile = new File(tempFilePath + modifyName);

                                String imageUrl = "";
                                String resultName = "re-" + modifyName;
                                BufferedImage srcImg = ImageIO.read(tempFile);
                                if (srcImg.getWidth() > 300) {
                                    BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_WIDTH, 300);
                                    File resultFile = new File(tempFilePath + resultName);
                                    ImageIO.write(destImg, imageExt.toLowerCase(), resultFile);
                                    fileList.add(resultFile);
                                    imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + resultName;
                                } else {
                                    fileList.add(tempFile);
                                    imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyName;

                                }
                                board.setThumnailUrl(imageUrl);

                            }
                            for (Element imgElement : hasImgs) {

                                String imglUrlBody = imgElement.attr("src");
                                log.debug("]-----] imglUrlBody raw [-----[ {}", imglUrlBody);
                                if (!imglUrlBody.startsWith("http")) {
                                    imglUrlBody = "https://coinpan.com" + imgElement.attr("src");
                                }
                                log.debug("]-----] imglUrlBody [-----[ {}", imglUrlBody);
                                String imageUrlBody = "";
                                InputStream inBody = new URL(imglUrlBody).openStream();
                                String imageExtBody = StringUtils.defaultIfBlank(getFileExtension(imglUrlBody), "");
                                String collectionUuidBody = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(30);
                                String modifyNameBody = collectionUuidBody + "." + imageExtBody;
                                Files.copy(inBody, Paths.get("/Users/cola/Downloads/tmp/" + modifyNameBody), StandardCopyOption.REPLACE_EXISTING);
                                File tempFileBody = new File("/Users/cola/Downloads/tmp/" + modifyNameBody);
                                fileList.add(tempFileBody);
                                imageUrlBody = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyNameBody;
                                imgElement.attr("src", imageUrlBody);
                            }
                            transferManager.uploadFileList(bucketName, path, new File(tempFilePath), fileList).waitForCompletion();
                        }
                        board.setMemberId(meberId);
                        board.setContent(detailBody.html());
                        board.setTitle(detailHead);
                        board.setBoardMasterId(1l);
                        if (StringUtils.isNotBlank(titleHead)) {
                            board.setTitleHead(titleHead.replaceAll("[|]", ""));
                        }
                        boards.add(board);
                    }
                } catch (Exception e) {
                    log.error("]-----] error [-----[ {}", e);
                }

            }
//            log.debug("]-----] boards [-----[ {}", boards.get(0));
            Collections.reverse(boards);
            log.debug("]-----] boards reverse[-----[ {}", boards.get(0));
            boardRepository.saveAll(boards);
//            }
        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }


    @Test
    public void imageTest() {
        try {
//            for (int i = 9; i >= 0; i--) {

            Document doc = Jsoup.connect("https://coinpan.com/phone_gallery")
                    .ignoreContentType(true)
                    .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                    .cookie("PHPSESSID", "d9a8d0a851ff6492cf7c410c72f7acac")
                    .get();
            Elements newsHeadlines = doc.select("ul.sq_gallery li");
            List<Board> boards = new ArrayList<>();
            for (Element headline : newsHeadlines) {


                String detailUrl = headline.select("a").attr("href");

                String nickName = headline.select("span.nick_name").text();
                log.debug("]-----] nickName [-----[ {}", nickName);
                Member member = memberRepository.findByNickName(nickName);
                Long meberId = null;
                if (member == null) {
                    Member newMwmber = new Member();
                    newMwmber.setRealName(nickName);
                    newMwmber.setUsername(RandomStringUtils.randomAlphanumeric(8).toLowerCase());
                    newMwmber.setPassword(passwordEncoder.encode("qwer1234T"));
                    newMwmber.setEmail(RandomStringUtils.randomAlphanumeric(9).toLowerCase() + "@reward.com");
                    newMwmber.setGender(Gender.MALE);
                    newMwmber.setNickName(nickName);
                    memberRepository.save(newMwmber);

                    Role role = roleRepository.findByRole(RoleEnum.USER.getCode());
                    AuthRole authRole = new AuthRole();
                    authRole.setAuthId(newMwmber.getId());
                    authRole.setRoleId(role.getId());
                    authRoleRepository.save(authRole);

                    meberId = newMwmber.getId();
                } else {
                    meberId = member.getId();
                }


                Document docDetail = Jsoup.connect("https://coinpan.com" + detailUrl)
                        .ignoreContentType(true)
                        .userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
                        .cookie("PHPSESSID", "ed21b12ac60c421c3388f19998e5aa14")
                        .get();

                Elements detailBody = docDetail.select("div.read_body .xe_content");


                Elements remove = detailBody.select("div.wgtRv");
                detailBody.remove(remove);
                String detailHead = docDetail.select("div.read_header a").text();
                log.debug("]-----] detailHead [-----[ {}", detailHead);
                Board board = new Board();


                Elements hasImgs = detailBody.select("img");
                if (hasImgs.size() > 0) {
                    log.debug("]-----] size [-----[ {}", hasImgs.size());
                    List<File> fileList = new ArrayList<>();
                    Element hasImg = detailBody.select("img").first();
                    String path = "board/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                    if (hasImg != null) {
                        board.setHasImage(true);
                        String thumnailUrl = hasImg.attr("src");
                        if (!thumnailUrl.startsWith("http")) {
                            thumnailUrl = "https://coinpan.com" + hasImg.attr("src");
                        }

                        log.debug("]-----] thumnailUrl [-----[ {}", thumnailUrl);
                        InputStream in = new URL(thumnailUrl).openStream();
                        String imageExt = StringUtils.defaultIfBlank(getFileExtension(thumnailUrl), "");

                        String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(30);
                        String modifyName = collectionUuid + "." + imageExt.toLowerCase();
                        Files.copy(in, Paths.get(tempFilePath + modifyName), StandardCopyOption.REPLACE_EXISTING);
                        File tempFile = new File(tempFilePath + modifyName);

                        String imageUrl = "";
                        String resultName = "re-" + modifyName;
                        BufferedImage srcImg = ImageIO.read(tempFile);

                        if (srcImg.getWidth() > 300) {
                            BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_WIDTH, 300);
                            File resultFile = new File(tempFilePath + resultName);
                            ImageIO.write(destImg, imageExt.toLowerCase(), resultFile);
                            fileList.add(resultFile);
                            imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + resultName;
                        } else if (tempFile.length() > 500000) {
                            BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_WIDTH, srcImg.getWidth());
                            File resultFile = new File(tempFilePath + resultName);
                            ImageIO.write(destImg, imageExt.toLowerCase(), resultFile);
                            fileList.add(resultFile);
                            imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + resultName;
                        } else {
                            fileList.add(tempFile);
                            imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyName;

                        }
                        board.setThumnailUrl(imageUrl);

                    }
                    for (Element imgElement : hasImgs) {

                        String imglUrlBody = imgElement.attr("src");
                        log.debug("]-----] imglUrlBody raw [-----[ {}", imglUrlBody);
                        if (!imglUrlBody.startsWith("http")) {
                            imglUrlBody = "https://coinpan.com" + imgElement.attr("src");
                        }
                        log.debug("]-----] imglUrlBody [-----[ {}", imglUrlBody);
                        String imageUrlBody = "";
                        InputStream inBody = new URL(imglUrlBody).openStream();
                        String imageExtBody = StringUtils.defaultIfBlank(getFileExtension(imglUrlBody), "");
                        String collectionUuidBody = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(30);
                        String modifyNameBody = collectionUuidBody + "." + imageExtBody;
                        Files.copy(inBody, Paths.get("/Users/cola/Downloads/tmp/" + modifyNameBody), StandardCopyOption.REPLACE_EXISTING);
                        File tempFileBody = new File("/Users/cola/Downloads/tmp/" + modifyNameBody);
                        fileList.add(tempFileBody);
                        imageUrlBody = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyNameBody;
                        imgElement.attr("src", imageUrlBody);
                    }
                    transferManager.uploadFileList(bucketName, path, new File(tempFilePath), fileList).waitForCompletion();
                }
                board.setMemberId(meberId);
                board.setContent(detailBody.html());
                board.setTitle(detailHead);
                board.setBoardMasterId(17l);

                boards.add(board);


            }
//            log.debug("]-----] boards [-----[ {}", boards.get(0));
            Collections.reverse(boards);
            log.debug("]-----] boards reverse[-----[ {}", boards.get(0));
            boardRepository.saveAll(boards);
//            }
        } catch (Exception e) {
            log.error("]-----] error [-----[ {}", e);
        }


    }
}
