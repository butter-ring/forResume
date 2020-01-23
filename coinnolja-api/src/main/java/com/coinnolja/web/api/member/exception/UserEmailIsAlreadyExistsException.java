package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserEmailIsAlreadyExistsException extends CnException {


    public UserEmailIsAlreadyExistsException() {
        super("UserEmailIsAlreadyExistsException", ErrorMessagerCode.USER_EMAIL_IS_ALREADY_EXISTS);
        
    }

    public UserEmailIsAlreadyExistsException(String message) {
        super(message);
    }

    public UserEmailIsAlreadyExistsException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserEmailIsAlreadyExistsException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserEmailIsAlreadyExistsException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserEmailIsAlreadyExistsException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
