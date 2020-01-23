package com.coinnolja.web.api.board.mapper;

import com.coinnolja.web.api.board.constant.SubType;
import com.coinnolja.web.api.common.model.BaseDTO;
import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.mapper.MemberDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Transient;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class BoardDTO extends BaseDTO {

    private Long boardMasterId;
    private String title;

    private String content;

    private Long memberId;
    private int upVoteCount;
    private int downVoteCount;
    private int readCount;
    private SubType subType;
    private boolean isTop;
    private boolean isNew;
    private boolean hasImage;
    private boolean hasLink;
    private String thumnailUrl;
    private int commentCount;
    private MemberDTO member;
    private BoardMasterDTO boardMaster;
    private String titleHead;
    private int judgeCount;
}
