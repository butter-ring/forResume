package com.cubeexchange.web.api.member;

import com.cubeexchange.web.api.common.exception.CnError;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import com.cubeexchange.web.api.common.util.AesUtil;
import com.cubeexchange.web.api.common.util.SendGridMail;
import com.cubeexchange.web.api.common.util.Siteverify;
import com.cubeexchange.web.api.common.util.SiteverifyUtil;
import com.cubeexchange.web.api.member.exception.*;
import com.cubeexchange.web.api.member.view.MemberSignup;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import reactor.core.publisher.Mono;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.cubeexchange.web.api.member.constant.MemberConstants.IS_HUMAN_SCORE;

@Slf4j
@Component
public class MemberValidation {


    @Value("${user.valid.requrl}")
    private String requrl;

    //    private static Pattern passwordPattern = Pattern.compile("^(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!]).{8,20}$");
    // private static Pattern passwordPattern = Pattern.compile("^[a-zA-Z0-9]{6,25}$");
    private static Pattern passwordPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^()]{8,25}$");
    private final SendGridMail sendGridMail;
    private final AesUtil aesUtil;
    private final MemberValidHistoryRepository memberValidHistoryRepository;
    private final MemberRepository memberRepository;
    private final SiteverifyUtil siteverifyUtil;

    public MemberValidation(
            SendGridMail sendGridMail, AesUtil aesUtil, MemberValidHistoryRepository memberValidHistoryRepository, MemberRepository memberRepository, SiteverifyUtil siteverifyUtil) {

        this.sendGridMail = sendGridMail;
        this.aesUtil = aesUtil;
        this.memberValidHistoryRepository = memberValidHistoryRepository;
        this.memberRepository = memberRepository;
        this.siteverifyUtil = siteverifyUtil;
    }


    public Mono<MemberSignup> validateMemberSignup(MemberSignup memberSignup) {
        //String password = userSignUp.getPassword();

        return Mono.justOrEmpty(memberSignup)
                .flatMap(this::validateRecaptcha)
                .flatMap(this::validateUsername)
                .flatMap(this::validatePassword);
//                .flatMap(this::validateEmail);

    }

    public Mono<MemberSignup> validateRecaptcha(MemberSignup memberSignup) {
        log.debug("]-----] MemberValidation::validateRecapcha memberSignup[-----[ {}", memberSignup);
        if (StringUtils.isEmpty(memberSignup.getRecaptchaToken())) {
            return Mono.error(new RecaptchaTokoenNotValidException());
        }
        try {
            Siteverify siteverify = siteverifyUtil.siteverifyToken(memberSignup.getRecaptchaToken());
            log.debug("]-----] MemberValidation::validateRecapcha siteverify[-----[ {}", siteverify);
            if (siteverify.getScore() < IS_HUMAN_SCORE) {
                return Mono.error(new RecaptchaTokoenNotHumanException());
            }
        } catch (Exception e) {
            return Mono.error(e);
        }

        return Mono.just(memberSignup);

    }

    public Mono<MemberSignup> validateUsername(MemberSignup memberSignup) {
        log.debug("]-----] MemberValidation::validateUsername userSignUp[-----[ {}", memberSignup);
        if (StringUtils.isEmpty(memberSignup.getUsername())) {
            return Mono.error(new UserNameIsEmptyException(ErrorMessagerCode.USER_NAME_IS_EMPTY));
        }
        if (memberRepository.findByUsername(memberSignup.getUsername()) != null) {
            return Mono.error(new UserNameIsAlreadyExistsException());
        }
        return Mono.just(memberSignup);

    }


    public Mono<MemberSignup> validateEmail(MemberSignup memberSignup) {
        log.debug("]-----] MemberValidation::validateEmail userSignUp[-----[ {}", memberSignup);
        if (StringUtils.isEmpty(memberSignup.getUsername())) {
            return Mono.error(new UserNameIsEmptyException(ErrorMessagerCode.USER_EMAIL_IS_EMPTY));
        }
        return Mono.justOrEmpty(memberSignup)
                .flatMap(user -> {
                    log.debug("]-----] MemberValidation::validateEmail exists[-----[ {}", user);
                    if (!validateEmail(user.getUsername())) {
                        return Mono.error(new EmailNotValidException());
                    }
                    if (memberRepository.findByUsernameAndActive(user.getUsername(), 1) != null) {
                        return Mono.error(new UserEmailIsAlreadyExistsException());
                    }
//                    if (memberRepository.existsByNickName(user.getNickName())) {
//                        return Mono.error(new UserNickNameIsAlreadyExistsException());
//                    }
                    return Mono.just(memberSignup);
                })
                .flatMap(user -> {

                    log.debug("]-----] MemberValidation::validateEmail exists users [-----[ {}", user);
                    return Mono.just(memberSignup);
                });
    }

    public boolean validateEmail(String emailStr) {
        Matcher matcher = Pattern.compile("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", Pattern.CASE_INSENSITIVE).matcher(emailStr);
        if (matcher.find()) {
            return true;
        } else {
            return false;
        }
    }

    public Mono<MemberSignup> validatePassword(MemberSignup memberSignup) {
//        log.debug("]-----] UserValidation::validatePassword password[-----[ {}", memberSignup.getPassword());
//        log.debug("]-----] UserValidation::validatePassword password[-----[ {}", memberSignup.getConfirmPassword ());


        List<CnError> errors = new ArrayList<>();
        if (StringUtils.isEmpty(memberSignup.getPassword())) {
            return Mono.error(new PasswordEmptyException(ErrorMessagerCode.USER_PASSWORD_IS_EMPTY));
        }
        if (StringUtils.isEmpty(memberSignup.getConfirmPassword())) {
            return Mono.error(new PasswordEmptyException(ErrorMessagerCode.USER_PASSWORD_REPEAT_IS_EMPTY));
        }

        Matcher mtchPassword = passwordPattern.matcher(memberSignup.getPassword());
        Matcher mtchpasswordRepeat = passwordPattern.matcher(memberSignup.getConfirmPassword());

        if (!mtchPassword.matches()) {
            errors.add(new CnError("/member/signUp", ErrorMessagerCode.USER_PASSWORD_PATTERN_IS_NOT_ALLOWED.getCode(), ErrorMessagerCode.USER_PASSWORD_PATTERN_IS_NOT_ALLOWED.getResponseValue()));
        }
        if (!mtchpasswordRepeat.matches()) {
            errors.add(new CnError("/member/signUp", ErrorMessagerCode.USER_PASSWORD_REPEAT_PATTERN_IS_NOT_ALLOWED.getCode(), ErrorMessagerCode.USER_PASSWORD_REPEAT_PATTERN_IS_NOT_ALLOWED.getResponseValue()));
        }
        if (!StringUtils.equals(memberSignup.getPassword(), memberSignup.getConfirmPassword())) {
            errors.add(new CnError("/member/signUp", ErrorMessagerCode.USER_PASSWORD_IS_NOT_EQUALS.getCode(), ErrorMessagerCode.USER_PASSWORD_IS_NOT_EQUALS.getResponseValue()));
        }

        if (errors.size() > 0) {
            PasswordNotValidException passwordNotValidException = new PasswordNotValidException(ErrorMessagerCode.USER_PASSWORD_IS_NOT_ALLOWED);
            passwordNotValidException.setErrors(errors);

            return Mono.error(passwordNotValidException);
        }
        return Mono.just(memberSignup);
    }



    public Mono<MemberValidationHistory> validateEmailSend(MemberValidationHistory memberValidationHistory) {
        Long createdAt = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();
        String validString = createdAt + "|" + memberValidationHistory.getValidString() + "|" + memberValidationHistory.getMemberId();

        log.debug("]-----] MemberValidation::validateEmailSend validString[-----[ {}", validString);
        log.debug("]-----] MemberValidation::validateEmailSend aesUtil.encrypt(validString)[-----[ {}", aesUtil.encrypt(validString));

        String subject = "[Cube Exchange] 이메일 인증 안내";

        try {
            String contents = "<pre>Cube Exchange에 회원가입을 해주셔서 감사합니다. <br />" +
                    "회원가입에 따른 이메일 인증을 위해 아래 링크 주소를 클릭 또는 터치하세요. <br />" +
                    "메일을 받으신 후 1시간 이내에 인증이 완료되지 않으면 입력하신 가입정보는 삭제되며, 새롭게 회원가입 및 인증 절차가 필요합니다. <br />" +
                    "<br />" +
                    "등록 이메일 : " + memberValidationHistory.getUsername() +
                    "<br />" +
                    "이메일 인증 : " + requrl + "?valid=" + aesUtil.encrypt(validString) +
                    "<br />" +
                    "궁금하거나 불편한 사항은 <br />" +
                    "이메일 help@cubeexchange.com 으로 <br />" +
                    "문의주시기 바랍니다.</pre>";

            // log.debug("]-----] MemberValidation::validateEmailSend aesUtil.encrypt[-----[ {}", aesUtil.encrypt(validString));
            sendGridMail.sendMail("help@cubeexchange.com", memberValidationHistory.getUsername(), contents, subject);
            log.debug("]-----] MemberValidation::validateEmailSend  {}, {}, {} [-----[ ", memberValidationHistory.getUsername(), contents, subject);
//            sendGridMail.sendMail("help@literproject.com", memberValidationHistory.getEmail(), contents, subject);
        } catch (Exception ex) {
            return Mono.error(ex);
        }
        return Mono.just(memberValidationHistory);
    }

    public Mono<MemberValidationHistory> validateEmailRequest(Member member, Mono<MemberValidationHistory> validEnc) {
        log.debug("]-----] member [-----[ {}", member);
        log.debug("]-----] validEnc [-----[ {}", validEnc);
        return validEnc
                .flatMap(this::validDec)
                .flatMap(this::validUpate)
                ;
    }

    public Mono<MemberValidationHistory> validDec(MemberValidationHistory userValidationHistory) {
        log.debug("]-----]decString[-----[ {}", userValidationHistory);
        String decString = aesUtil.decrypt(userValidationHistory.getValidString());
        log.debug("]-----]decString[-----[ {}", decString);
        String[] validArry = StringUtils.split(decString, "|");
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime createdAt = Instant.ofEpochMilli(Long.parseLong(validArry[0])).atZone((ZoneOffset.UTC)).toLocalDateTime();

        Duration duration = Duration.between(now, createdAt);
        long diff = Math.abs(duration.toMinutes());
        log.debug("]-----]diff[-----[ {}", diff);
        if (diff > 120) {
            return Mono.error(new ValidTokenExpiredException());
        }
        userValidationHistory.setValidString(validArry[1]);
        userValidationHistory.setMemberId(Long.parseLong(validArry[2]));
        return Mono.just(userValidationHistory);

    }


    public Mono<MemberValidationHistory> validUpate(MemberValidationHistory memberValidationHistory) {
        log.debug("]-----]validUpate[-----[ {}", memberValidationHistory);
        MemberValidationHistory findHistory = memberValidHistoryRepository.findByValidStringAndMemberIdAndActive(
                memberValidationHistory.getValidString()
                , memberValidationHistory.getMemberId()
                , 1
        );
        if (findHistory != null) {
            Long createdAt = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();
            findHistory.setValidatedAt(createdAt);
            findHistory.setActive(0);
            memberValidHistoryRepository.save(findHistory);
        } else {
            return Mono.error(new ValidTokenNotMatchedException());
        }
        return Mono.just(memberValidationHistory);
    }


    public Mono<MemberSignup> findMyInfoEmailSend(MemberSignup memberSignup) {
        String subject = "[Cube Exchange] 비밀번호 초기화";

        try {
            String contents = "<pre>Cube Exchange 비밀번호 초기화 메일 입니다.. <br />" +
                    "<br />" +
                    "등록 이메일 : " + memberSignup.getUsername() +
                    "<br />" +
                    "초기화된 비밀번호 : " + memberSignup.getPassword() +
                    "<br />" +
                    "궁금하거나 불편한 사항은 <br />" +
                    "이메일 help@cubeexchange.com 으로 <br />" +
                    "문의주시기 바랍니다.</pre>";


            sendGridMail.sendMail("help@cubeexchange.com", memberSignup.getUsername(), contents, subject);
            log.debug("]-----] MemberValidation::validateEmailSend  {}, {}, {} [-----[ ", memberSignup.getUsername(), contents, subject);
        } catch (Exception ex) {
            return Mono.error(ex);
        }
        return Mono.just(memberSignup);
    }

}
