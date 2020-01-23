package com.coinnolja.web.api.mediacollection;

import com.coinnolja.web.api.mediacollection.constant.MediaCollectionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaCollectionDTO {

    private String collectionUuid;              //미디어 RandomStringUtils

    private String originName;                  //원본파일명

    private String modifyName;                  //수정파일명

    private MediaCollectionType mediaType;      //0.이미지 1.유투브 2. 비메오


    private String path;                        //경로    aws 웹경로 (폴더명)

    private String fullPath;                    //전체패스

    private String fullPathSmall;                    //전체패스

    private String fullPathMedium;                    //전체패스
    private String fullPathReduce;                    //전체패스

    private String hashCode;                    //ipfs 코드

    private String imageExt;                    //확장자

    private String movieKey;                    //동영상 키

    public void setMediaType(Integer mediaType) {
        this.mediaType = MediaCollectionType.values()[mediaType];
    }
}
