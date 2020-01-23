package com.cubeexchange.web.api.member.exception;


import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class UserNickNameIsEmptyException extends CnException {


    public UserNickNameIsEmptyException() {
        super("UserNickNameIsEmptyException", ErrorMessagerCode.USER_NICK_NAME_IS_EMPTY);
    }

    public UserNickNameIsEmptyException(String message) {
        super(message);
    }

    public UserNickNameIsEmptyException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public UserNickNameIsEmptyException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public UserNickNameIsEmptyException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public UserNickNameIsEmptyException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
