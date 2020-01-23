package com.coinnolja.web.api.judge;

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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"reply_id", "member_id"}))
public class ReplyJudge extends BaseEntity {


    @Column(name = "reply_id")
    private Long replyId;
    @Column(name = "member_id")
    private Long memberId;



}
