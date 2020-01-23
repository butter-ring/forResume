package com.coinnolja.web.api.mediacollection;

import com.amazonaws.services.s3.transfer.TransferManager;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class MediaCollectionHandler {

    @Value("${path.file.tmp}")
    private String tempFilePath;

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Value("${aws.bucket.url}")
    private String bucketUrl;


    private final TransferManager transferManager;

    public MediaCollectionHandler(
            TransferManager transferManager
    ) {
        this.transferManager = transferManager;
    }

    /**
     * POST a MediaCollecton
     */
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> imgUploadSingle(ServerRequest request) {
        log.info("]-----] MediaCollectionHandler::imgUploadSingle call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(member ->
                                request.body(BodyExtractors.toMultipartData())
                                        .flatMap(partMap -> {
                                            log.debug("]-----] MediaCollectionHandler::imgUploadSingle partMap [-----[ {}", partMap);
                                            Part part = partMap.getFirst("media");
                                            String imageUrl = "";
                                            log.debug("]-----] MediaCollectionHandler::imgUploadSingle part [-----[ {}", part);
                                            log.debug("]-----] MediaCollectionHandler::imgUploadSingle part [-----[ {}", part.name());
                                            log.debug("]-----] MediaCollectionHandler::imgUploadSingle part [-----[ {}", part.content());
                                            log.debug("]-----] MediaCollectionHandler::imgUploadSingle part [-----[ {}", part.getClass());
                                            if (part instanceof FilePart) {
                                                try {

                                                    FilePart filePart = ((FilePart) part);
                                                    log.debug("]-----] MediaCollectionHandler::imgUploadSingle filename [-----[ {}", filePart.filename());

                                                    String originalFileName = filePart.filename();

                                                    String imageExt = StringUtils.defaultIfBlank(getFileExtension(originalFileName), "");
                                                    String path = "board/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                                                    String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(24);
                                                    String modifyName = collectionUuid + "." + imageExt;

                                                    File tempFile = new File(tempFilePath + modifyName);
                                                    log.debug("]-----] MediaCollectionHandler::imgUploadSingle tempFile [-----[ {}", tempFile);
                                                    filePart.transferTo(tempFile);

                                                    List<File> fileList = new ArrayList<>();
                                                    BufferedImage srcImg = ImageIO.read(tempFile);
                                                    String resultName = "re-" + modifyName;
//                                                    Upload xfer = null;
                                                    if (srcImg.getWidth() > 1024) {
                                                        BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_WIDTH, 1024);
                                                        File resultFile = new File(tempFilePath + resultName);
                                                        ImageIO.write(destImg, imageExt.toLowerCase(), resultFile);
                                                        fileList.add(resultFile);
                                                        imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + resultName;
//                                                        transferManager.upload(bucketName, path, resultFile);

                                                    } else {
                                                        fileList.add(tempFile);
                                                        imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyName;
//                                                        transferManager.upload(bucketName, path, tempFile);
                                                    }

                                                    transferManager.uploadFileList(bucketName, path, new File(tempFilePath), fileList).waitForCompletion();

                                                } catch (Exception e) {
                                                    return Mono.error(e);
                                                }
                                            }

                                            return Mono.just(imageUrl);
                                        })
                )

                .flatMap(url -> ok().body(fromObject(url)))
                .switchIfEmpty(notFound().build());

    }


    private static boolean isImage(File file) throws IOException {
        return (ImageIO.read(file) != null);
    }

    private static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return null;
        }
    }

}



