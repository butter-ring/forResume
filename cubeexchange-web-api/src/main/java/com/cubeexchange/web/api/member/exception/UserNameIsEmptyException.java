package com.cubeexchange.web.api.member.exception;

import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserNameIsEmptyException extends CnException {


    public UserNameIsEmptyException() {
        super("UsernameIsEmptyException", ErrorMessagerCode.USER_NAME_IS_EMPTY);
    }

    public UserNameIsEmptyException(String message) {
        super(message);
    }

    public UserNameIsEmptyException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserNameIsEmptyException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserNameIsEmptyException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserNameIsEmptyException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
