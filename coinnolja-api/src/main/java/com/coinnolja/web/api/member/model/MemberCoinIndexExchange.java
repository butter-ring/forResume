package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class MemberCoinIndexExchange extends BaseEntity {
    private Long memberId;
    private String exchangeCode;
    private String exchangeName;
    private boolean selected = false;
}
