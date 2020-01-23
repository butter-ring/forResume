package com.cubeexchange.web.api.member.exception;


import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class PasswordEmptyException extends CnException {


    public PasswordEmptyException() {
        super("PasswordEmptyException", ErrorMessagerCode.USER_PASSWORD_IS_EMPTY);
    }

    public PasswordEmptyException(String message) {
        super(message);
    }

    public PasswordEmptyException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public PasswordEmptyException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public PasswordEmptyException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public PasswordEmptyException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
