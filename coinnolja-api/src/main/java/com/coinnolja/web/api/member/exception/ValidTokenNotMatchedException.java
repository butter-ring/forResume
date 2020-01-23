package com.coinnolja.web.api.member.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class ValidTokenNotMatchedException extends CnException {


    public ValidTokenNotMatchedException() {
        super("ValidTokenNotMatchedException", ErrorMessagerCode.VALID_TOKEN_NOT_MATCHED_EXCEPTION);
    }

    public ValidTokenNotMatchedException(String message) {
        super(message);
    }

    public ValidTokenNotMatchedException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public ValidTokenNotMatchedException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public ValidTokenNotMatchedException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public ValidTokenNotMatchedException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
