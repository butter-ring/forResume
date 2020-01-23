package com.cubeexchange.web.api.member.exception;


import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class RecaptchaTokoenNotHumanException extends CnException {


    public RecaptchaTokoenNotHumanException() {
        super("RecaptchaTokoenNotHumanException", ErrorMessagerCode.RECAPTCHA_TOKOEN_NOT_HUMAN);
    }

    public RecaptchaTokoenNotHumanException(String message) {
        super(message);
    }

    public RecaptchaTokoenNotHumanException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public RecaptchaTokoenNotHumanException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public RecaptchaTokoenNotHumanException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public RecaptchaTokoenNotHumanException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
