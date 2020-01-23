package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class PasswordNotValidException extends CnException {


    public PasswordNotValidException() {
        super("PasswordNotValidException", ErrorMessagerCode.USER_PASSWORD_IS_NOT_ALLOWED);
    }

    public PasswordNotValidException(String message) {
        super(message);
    }

    public PasswordNotValidException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public PasswordNotValidException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public PasswordNotValidException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public PasswordNotValidException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
