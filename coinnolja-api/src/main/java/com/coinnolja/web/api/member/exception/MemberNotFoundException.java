package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class MemberNotFoundException extends CnException {


    public MemberNotFoundException() {
        super("MemberNotFoundException", ErrorMessagerCode.MEMBER_NOT_FOUND_EXCEPTION);

    }

    public MemberNotFoundException(String message) {
        super(message);
    }

    public MemberNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public MemberNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public MemberNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public MemberNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
