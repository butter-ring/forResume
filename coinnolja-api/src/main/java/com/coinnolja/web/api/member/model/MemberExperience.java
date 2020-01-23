package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.coinnolja.web.api.member.constant.ExperienceType;
import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.constant.MemberStatus;
import com.coinnolja.web.api.member.constant.SnsType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class MemberExperience extends BaseEntity {

    private Long memberId;
    private ExperienceType experienceType;
    private int experience;
    private String ipAddress;


}
