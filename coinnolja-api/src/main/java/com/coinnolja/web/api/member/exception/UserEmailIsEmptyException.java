package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserEmailIsEmptyException extends CnException {


    public UserEmailIsEmptyException() {
        super("UserEmailIsEmptyException", ErrorMessagerCode.USER_EMAIL_IS_EMPTY_EXCEPTION);

    }

    public UserEmailIsEmptyException(String message) {
        super(message);
    }

    public UserEmailIsEmptyException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserEmailIsEmptyException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserEmailIsEmptyException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserEmailIsEmptyException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
