package com.cubeexchange.trade.account;

import com.cubeexchange.trade.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"member_id", "currency"}))
public class Account extends BaseEntity {

    @Column(name = "member_id")
    private Long memberId;
    private String accountType;
    private String currency;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal accountBalance = BigDecimal.ZERO;
    @Column(nullable = false, precision = 36, scale = 12)
    private BigDecimal availableBalance = BigDecimal.ZERO;
    private BigDecimal makerFeeRate;
    private BigDecimal takerFeeRate;

}