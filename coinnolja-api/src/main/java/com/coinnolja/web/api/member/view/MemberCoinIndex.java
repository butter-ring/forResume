package com.coinnolja.web.api.member.view;

import com.coinnolja.web.api.member.model.MemberCoinIndexExchange;
import com.coinnolja.web.api.member.model.MemberCoinIndexToken;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class MemberCoinIndex {

    List<MemberCoinIndexExchange> memberCoinIndexExchanges;
    List<MemberCoinIndexToken> memberCoinIndexTokens;
}
