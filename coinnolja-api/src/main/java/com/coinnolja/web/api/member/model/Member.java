package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.mediacollection.MediaCollection;
import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.constant.MemberStatus;
import com.coinnolja.web.api.member.constant.SnsType;
import com.coinnolja.web.api.member.constant.ValidStatus;
import com.coinnolja.web.api.member.view.MemberLevel;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Transient;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Member extends BaseEntity {

    @Column(unique = true)
    private String username;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(unique = true)
    private String nickName;
    private String realName;

    @Column(unique = true)
    private String email;
    private Gender gender;
    private LocalDate birthday;

    private MemberStatus status;
    private Long leavedAt;
    private Long lastSigninAt;
    private Integer emailValidStatus;
    private String profileImageUrl;
    private String profileImageSmallUrl;

    private String snsId;
    private SnsType snsType;


    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)

    private int memberLevel;
    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)
    private int memberExperience; // MemberExperience 역정규화
    @Column(columnDefinition = "INT DEFAULT 0", nullable = false)
    private int memberPoint; // MemberPoint 역정규화

    private ValidStatus validStatus = ValidStatus.NOTYET;

    private String collectionUuid;

    @Transient
    @com.fasterxml.jackson.annotation.JsonIgnore
    private MediaCollection mediaCollection;

    @Transient
    private MemberLevel level;

    public MemberLevel getLevel() {
        return new MemberLevel(this.memberExperience, this.isAdmin);
    }

    private boolean isAdmin = false;
}
