package com.coinnolja.web.api.mediacollection;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.mediacollection.constant.MediaCollectionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.File;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class MediaCollection extends BaseEntity {

    @Column(name = "collection_uuid")
    private String collectionUuid;              //미디어 RandomStringUtils

    private String originName;                  //원본파일명

    private String modifyName;                  //수정파일명

    @Enumerated(EnumType.ORDINAL)
    private MediaCollectionType mediaType;      //0.이미지 1.유투브 2. 비메오


    private String path;                        //경로    aws 웹경로 (폴더명)

    private String fullPath;                    //전체패스

    private String fullPathSmall;                    //전체패스

    private String fullPathMedium;                    //전체패스
    private String fullPathReduce;                    //전체패스


    private String hashCode;                    //ipfs 코드

    private String imageExt;                    //확장자

    private String movieKey;                    //동영상 키

    private Integer sortPosition;                    //순서

    @Transient
    @JsonIgnore
    private File imageFile;                     //파일

    @Transient
    private String realPath;                    //경로

    @Transient
    private String virtualDirectoryKeyPrefix;

    @JsonIgnore
    @Transient
    private String buckName;


}
