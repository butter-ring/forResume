package com.coinnolja.web.api.member.view;

import com.coinnolja.web.api.member.constant.Gender;
import com.coinnolja.web.api.member.constant.SnsType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignup {

    private String username;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String confirmPassword;

    private String realName;
    private String email;

    private Gender gender;
    private LocalDate birthday;
    private String nickName;

    private String snsId;
    private SnsType snsType;
    private String recaptchaToken;


}
