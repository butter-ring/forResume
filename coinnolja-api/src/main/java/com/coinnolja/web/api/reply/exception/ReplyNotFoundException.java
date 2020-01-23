package com.coinnolja.web.api.reply.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class ReplyNotFoundException extends CnException {


    public ReplyNotFoundException() {
        super("ReplyNotFoundException", ErrorMessagerCode.BOARD_NOT_FOUND);
    }

    public ReplyNotFoundException(String message) {
        super(message);
    }

    public ReplyNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public ReplyNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public ReplyNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public ReplyNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
