package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.constant.PointGetType;
import com.coinnolja.web.api.member.constant.PointSpentType;
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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"member_id", "target_member_id"}))
public class MemberFollow extends BaseEntity {

    // private Long memberId;
    // private Long targetMemberId;

    private String targetMemberName;

    @Column(name = "member_id")
    private Long memberId;
    @Column(name = "target_member_id")
    private Long targetMemberId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "target_member_id", insertable = false, updatable = false)
    private Member targetMember;



}
