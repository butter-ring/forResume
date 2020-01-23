package com.coinnolja.web.api.common.util;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

import static com.coinnolja.web.api.common.exception.ErrorMessagerCode.RECAPTCHA_TOKOEN_NOT_VALID;

public class SiteverifyException extends CnException {


    public SiteverifyException() {
        super("SiteverifyException", RECAPTCHA_TOKOEN_NOT_VALID);
    }

    public SiteverifyException(String message) {
        super(message);
    }

    public SiteverifyException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public SiteverifyException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public SiteverifyException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public SiteverifyException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
