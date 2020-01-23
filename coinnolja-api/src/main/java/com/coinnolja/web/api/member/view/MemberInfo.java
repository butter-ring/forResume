package com.coinnolja.web.api.member.view;

import com.coinnolja.web.api.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class MemberInfo {
    private Member member;

}
