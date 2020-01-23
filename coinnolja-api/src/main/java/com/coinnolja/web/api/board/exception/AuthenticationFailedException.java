package com.coinnolja.web.api.board.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class AuthenticationFailedException extends CnException {


    public AuthenticationFailedException() {
        super("AuthenticationFailedException", ErrorMessagerCode.AUTHENTICATION_FAILED_EXCEPTION);
    }

    public AuthenticationFailedException(String message) {
        super(message);
    }

    public AuthenticationFailedException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public AuthenticationFailedException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public AuthenticationFailedException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public AuthenticationFailedException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
