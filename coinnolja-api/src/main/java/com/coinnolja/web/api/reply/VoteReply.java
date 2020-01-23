package com.coinnolja.web.api.reply;

import com.coinnolja.web.api.board.constant.VoteType;
import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"member_id", "reply_id"}))
public class VoteReply extends BaseEntity {

    @Column(name = "member_id")
    private Long memberId;
    @Column(name = "reply_id")
    private Long replyId;
    private VoteType voteType;

}
