package com.coinnolja.web.api.reply.mapper;

import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.common.model.BaseDTO;
import com.coinnolja.web.api.member.mapper.MemberDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ReplyDTO extends BaseDTO {

    private Long boardId;

    private String content;

    private Long memberId;

    private long parentId;
    private long depCount;

    private MemberDTO member;

    private Board board;

    private int judgeCount;

    private int childCount;

    private int upVoteCount;
    private int downVoteCount;



}
