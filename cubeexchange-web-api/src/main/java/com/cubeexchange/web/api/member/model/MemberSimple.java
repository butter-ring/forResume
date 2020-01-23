package com.cubeexchange.web.api.member.model;

import com.cubeexchange.web.api.common.model.BaseEntity;
import com.cubeexchange.web.api.member.constant.Gender;
import com.cubeexchange.web.api.member.constant.MemberStatus;
import com.cubeexchange.web.api.member.constant.ValidStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
public class MemberSimple extends BaseEntity {

    @Column(unique = true)
    private String username;
    private String nickName;

    private MemberStatus status;
    private Long lastSigninAt;
    private Long createdAt;

    private String realName;

    private ValidStatus validStatus = ValidStatus.NOTYET;

    private String authKey;
    private String authKeyurl;
    private String ethPublic;
    private boolean authKeystatus;
    private boolean authKeyactive;
    private boolean authEmail;

    private boolean isAdmin = false;


}

