package com.cubeexchange.web.api.auth.exception;

import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class EmailValidNotYetException extends CnException {


    public EmailValidNotYetException() {
        super("EmailValidNotYetException", ErrorMessagerCode.EMAIL_VALID_IS_NOT_YET);
    }

    public EmailValidNotYetException(String message) {
        super(message);
    }

    public EmailValidNotYetException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public EmailValidNotYetException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public EmailValidNotYetException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public EmailValidNotYetException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
