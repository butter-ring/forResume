package com.cubeexchange.web.api.member.exception;


import com.cubeexchange.web.api.common.exception.CnException;
import com.cubeexchange.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class ExperienceAlreadyExistsException extends CnException {


    public ExperienceAlreadyExistsException() {
        super("ExperienceAlreadyExistsException", ErrorMessagerCode.EXPERIENCE_ALREADY_EXISTS_EXCEPTION);

    }

    public ExperienceAlreadyExistsException(String message) {
        super(message);
    }

    public ExperienceAlreadyExistsException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public ExperienceAlreadyExistsException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public ExperienceAlreadyExistsException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public ExperienceAlreadyExistsException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
