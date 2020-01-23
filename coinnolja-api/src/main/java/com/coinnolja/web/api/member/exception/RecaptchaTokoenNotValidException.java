package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class RecaptchaTokoenNotValidException extends CnException {


    public RecaptchaTokoenNotValidException() {
        super("RecaptchaTokoenNotValidException", ErrorMessagerCode.RECAPTCHA_TOKOEN_NOT_VALID);
    }

    public RecaptchaTokoenNotValidException(String message) {
        super(message);
    }

    public RecaptchaTokoenNotValidException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public RecaptchaTokoenNotValidException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public RecaptchaTokoenNotValidException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public RecaptchaTokoenNotValidException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
