package com.coinnolja.web.api.auth.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UsernameNotFoundException extends CnException {


    public UsernameNotFoundException() {
        super("UsernameNotFoundException", ErrorMessagerCode.USERNAME_NOT_FOUND);
    }

    public UsernameNotFoundException(String message) {
        super(message);
    }

    public UsernameNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UsernameNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UsernameNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UsernameNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
