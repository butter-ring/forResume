package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserNickNameIsAlreadyExistsException extends CnException {


    public UserNickNameIsAlreadyExistsException() {
        super("UserNickNameIsAlreadyExistsException", ErrorMessagerCode.USER_NICK_NAME_IS_ALREADY_EXISTS);
    }

    public UserNickNameIsAlreadyExistsException(String message) {
        super(message);
    }

    public UserNickNameIsAlreadyExistsException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserNickNameIsAlreadyExistsException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserNickNameIsAlreadyExistsException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserNickNameIsAlreadyExistsException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
