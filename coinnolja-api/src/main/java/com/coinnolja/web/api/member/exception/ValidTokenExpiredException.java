package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class ValidTokenExpiredException extends CnException {


    public ValidTokenExpiredException() {
        super("ValidTokenExpiredException", ErrorMessagerCode.VALID_TOKEN_EXPIRED_EXCEPTION);
    }

    public ValidTokenExpiredException(String message) {
        super(message);
    }

    public ValidTokenExpiredException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public ValidTokenExpiredException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public ValidTokenExpiredException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public ValidTokenExpiredException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
