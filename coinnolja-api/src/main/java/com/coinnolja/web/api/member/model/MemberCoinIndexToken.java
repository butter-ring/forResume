package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class MemberCoinIndexToken extends BaseEntity {
    private Long memberId;
    private String tokenCode;
    private boolean selected = false;
}
