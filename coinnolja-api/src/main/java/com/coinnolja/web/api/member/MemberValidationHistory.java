package com.coinnolja.web.api.member;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.constant.MemberValidType;
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
public class MemberValidationHistory extends BaseEntity {

    private Long memberId;

    private String validString;

    private String email;

    private Long validatedAt;

    private MemberValidType validType;

}
