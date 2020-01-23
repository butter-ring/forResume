package com.cubeexchange.web.api.member;

import com.cubeexchange.web.api.common.model.BaseEntity;
import com.cubeexchange.web.api.member.constant.Gender;
import com.cubeexchange.web.api.member.constant.MemberStatus;
import com.cubeexchange.web.api.member.constant.SnsType;
import com.cubeexchange.web.api.member.constant.ValidStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "cn_member")
public class Member extends BaseEntity {

    @Column(unique = true)
    private String username; //email

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(unique = true)
    private String nickName;
    private String realName;

    private MemberStatus status;
    private Long leavedAt;
    private Long lastSigninAt;
    // private Integer emailValidStatus;

    private ValidStatus validStatus = ValidStatus.NOTYET;

    private String collectionUuid;

    private String authKey;
    private String authKeyurl;
    private String ethPublic;
    private String ethPrivate;
    private boolean authKeystatus = false;
    private boolean authKeyactive = false;
    private boolean authEmail = false;

    private boolean isAdmin = false;
}
