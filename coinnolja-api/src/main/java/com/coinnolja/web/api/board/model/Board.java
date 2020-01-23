package com.coinnolja.web.api.board.model;

import com.coinnolja.web.api.board.constant.SubType;
import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.mediacollection.MediaCollection;
import com.coinnolja.web.api.member.model.MemberSimple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Board extends BaseEntity {

    @Column(name = "board_master_id")
    private Long boardMasterId;
    private String title;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    @Column(name = "member_id")
    private Long memberId;
    private int upVoteCount;
    private int downVoteCount;
    private int readCount;
    private SubType subType;
    private boolean isTop;
    private boolean hasImage;
    private boolean hasLink;
    private String thumnailUrl;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "board_master_id", insertable = false, updatable = false)
    private BoardMaster boardMaster;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private MemberSimple member;

    private int commentCount;
    private int judgeCount;

    @Transient
    private boolean vote;

    private String titleHead;
    private String ipAddress;

    @Transient
    private Board nextBoard;
    @Transient
    private Board prevBoard;
    @Transient
    private List<String> imageList;

    @Column(name = "collection_uuid")
    private String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(24);

    @Transient
    private List<MediaCollection> mediaCollections;
}
