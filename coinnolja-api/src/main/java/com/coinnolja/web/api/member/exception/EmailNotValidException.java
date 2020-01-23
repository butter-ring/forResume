package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class EmailNotValidException extends CnException {


    public EmailNotValidException() {
        super("EmailNotValidException", ErrorMessagerCode.USER_EMAIL_IS_NOT_VALID);
    }

    public EmailNotValidException(String message) {
        super(message);
    }

    public EmailNotValidException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public EmailNotValidException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public EmailNotValidException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public EmailNotValidException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
