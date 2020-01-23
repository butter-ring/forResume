package com.coinnolja.web.api.common.exception;

public enum ErrorMessagerCode {

    SUCCESS(200000, "Ok"),
    ERROR(500000, "Fail"),

    USER_PASSWORD_IS_NOT_ALLOWED(500100, "Password is not valid"),
    USER_PASSWORD_IS_EMPTY(500101, "Password is empty"),
    USER_PASSWORD_PATTERN_IS_NOT_ALLOWED(500102, "Password pattern is not allowed."),
    USER_PASSWORD_REPEAT_IS_EMPTY(500103, "Password is not valid"),
    USER_PASSWORD_REPEAT_PATTERN_IS_NOT_ALLOWED(500104, "PasswordRepeat pattern is not allowed."),
    USER_PASSWORD_IS_NOT_EQUALS(500105, "Password is not equals."),
    USER_NAME_IS_EMPTY(500106, "Username is empty"),
    USER_NAME_IS_ALREADY_EXISTS(500107, "Username is already exists"),
    USER_EMAIL_IS_EMPTY(500108, "Email is empty"),
    USER_EMAIL_IS_ALREADY_EXISTS(500109, "Email is already exists"),
    USER_EMAIL_IS_NOT_VALID(500110, "Email is not valid"),
    USER_PROFILE_IMAGE_IS_EMPTY(500111, "Profile Image is empty"),
    USER_NICK_NAME_IS_EMPTY(500112, "User nick name is empty"),
    USER_NICK_NAME_IS_ALREADY_EXISTS(500113, "User nick name is already exists"),
    RECAPTCHA_TOKOEN_NOT_VALID(500114, "Recaptcha tokoen not valid"),
    RECAPTCHA_TOKOEN_NOT_HUMAN(500115, "Recaptcha tokoen not human"),
    USER_EMAIL_IS_EMPTY_EXCEPTION(500116, "User email is empty exception"),
    USER_EMAIL_IS_NOT_FOUND_EXCEPTION(500117, "User email is not found"),
    FOLLOW_ALREADY_EXISTS_EXCEPTION(500118, "Follow already exists exception"),
    ALREADY_JUDGE_EXCEPTION(500119, "Already judge exception"),
    MEMBER_NOT_FOUND_EXCEPTION(500200, "Member not found exception"),
    EXPERIENCE_ALREADY_EXISTS_EXCEPTION(500201, "Experience already exists exception"),

    USERNAME_NOT_FOUND(500200, "Username not found"),

    EMAIL_VALID_IS_NOT_YET(500201, "Email valid is not yet"),
    VALID_TOKEN_NOT_MATCHED_EXCEPTION(500202, "Valid token not matched exception"),
    VALID_TOKEN_EXPIRED_EXCEPTION(500203, "Valid token expired exception"),


    BOARD_NOT_FOUND(500300, "Board not found"),
    BOARD_MASTER_NOT_FOUND(500301, "Boardmaster not found"),
    ALREADY_VOTED_EXCEPTION(500302, "Already voted exception"),
    IMAGE_NOT_FOUND(500303, "Image not found"),
    AUTHENTICATION_FAILED_EXCEPTION(500304, "Authentication failed exception"),
    DUMMY(900000, "Dummy");


    ErrorMessagerCode(final int codeValue, final String responseValue) {
        this.codeValue = codeValue;
        this.responseValue = responseValue;
    }

    private int codeValue;
    private String responseValue;

    public int getCode() {
        return codeValue;
    }

    public String getResponseValue() {
        return responseValue;
    }

}
