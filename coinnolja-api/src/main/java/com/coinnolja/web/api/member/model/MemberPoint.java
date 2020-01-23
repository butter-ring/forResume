package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.constant.ExperienceType;
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
//@Table(name = "memberPoint")
public class MemberPoint extends BaseEntity {

    private Long memberId;
    private Long senderId;
    private PointGetType pointGetType;
    private PointSpentType pointSpentType;
    private int point = 0;
    private Long sourceId;
    private String sourceType;
    private String memo;
    private String attendDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "memberId", insertable = false, updatable = false)
    private MemberSimple member;

}
