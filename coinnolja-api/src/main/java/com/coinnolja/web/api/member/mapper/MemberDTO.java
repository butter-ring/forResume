package com.coinnolja.web.api.member.mapper;

import com.coinnolja.web.api.member.view.MemberLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {

    private Long id;
    private String username;
    private String nickName;
    private String profileImageUrl;
    private String profileImageSmallUrl;
    private int memberLevel;
    private int memberExperience;
    private MemberLevel level;

    public MemberLevel getLevel() {
        return new MemberLevel(this.memberExperience, this.isAdmin);
    }

    private boolean isAdmin = false;


}
