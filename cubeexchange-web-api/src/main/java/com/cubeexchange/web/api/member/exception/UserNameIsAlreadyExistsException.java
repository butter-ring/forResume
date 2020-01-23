package com.cubeexchange.web.api.member.exception;

import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserNameIsAlreadyExistsException extends CnException {


    public UserNameIsAlreadyExistsException() {
        super("UsernameIsAlreadyExistsException", ErrorMessagerCode.USER_NAME_IS_ALREADY_EXISTS);
    }

    public UserNameIsAlreadyExistsException(String message) {
        super(message);
    }

    public UserNameIsAlreadyExistsException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserNameIsAlreadyExistsException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserNameIsAlreadyExistsException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserNameIsAlreadyExistsException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
