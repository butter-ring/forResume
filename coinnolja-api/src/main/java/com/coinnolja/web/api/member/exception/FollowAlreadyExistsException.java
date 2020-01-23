package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class FollowAlreadyExistsException extends CnException {


    public FollowAlreadyExistsException() {
        super("FollowAlreadyExistsException", ErrorMessagerCode.FOLLOW_ALREADY_EXISTS_EXCEPTION);
    }

    public FollowAlreadyExistsException(String message) {
        super(message);
    }

    public FollowAlreadyExistsException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public FollowAlreadyExistsException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public FollowAlreadyExistsException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public FollowAlreadyExistsException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
