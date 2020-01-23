package com.coinnolja.web.api.search;

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
public class Search extends BaseEntity {

    @Column(nullable = false)
    private String searchWord;

    private Long memberId;


}
