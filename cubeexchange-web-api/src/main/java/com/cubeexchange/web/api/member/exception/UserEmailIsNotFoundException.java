package com.cubeexchange.web.api.member.exception;

import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserEmailIsNotFoundException extends CnException {


    public UserEmailIsNotFoundException() {
        super("UserEmailIsNotFoundException", ErrorMessagerCode.USER_EMAIL_IS_NOT_FOUND_EXCEPTION);

    }

    public UserEmailIsNotFoundException(String message) {
        super(message);
    }

    public UserEmailIsNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserEmailIsNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserEmailIsNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserEmailIsNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
