package com.coinnolja.web.api.reply;

import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.model.MemberSimple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Reply extends BaseEntity {

    @Column(name = "board_id")
    private Long boardId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "member_id")
    private Long memberId;

    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)
    private long parentId;
    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)
    private long depCount;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private MemberSimple member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "board_id", insertable = false, updatable = false)
    private Board board;

    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)
    private int judgeCount;

    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)
    private int childCount;

    private int upVoteCount;
    private int downVoteCount;


}
