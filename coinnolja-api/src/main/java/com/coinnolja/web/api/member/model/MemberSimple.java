package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.constant.MemberStatus;
import com.coinnolja.web.api.member.constant.ValidStatus;
import com.coinnolja.web.api.member.view.MemberLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "member")
public class MemberSimple extends BaseEntity {

    @Column(unique = true)
    private String username;
    private String nickName;

    private MemberStatus status;
    private String profileImageUrl;
    private String profileImageSmallUrl;
    private int memberLevel;
    private int memberExperience; // MemberExperience 역정규화
    private int memberPoint; // MemberPoint 역정규화
    private Long lastSigninAt;
    private Long createdAt;

    private LocalDate birthday;
    private Gender gender;
    private String realName;

    private ValidStatus validStatus = ValidStatus.NOTYET;

    @Transient
    private MemberLevel level;

    public MemberLevel getLevel() {
        return new MemberLevel(this.memberExperience, this.isAdmin);
    }

    private boolean isAdmin = false;


}
