package com.coinnolja.web.api.board.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class BoardNotFoundException extends CnException {


    public BoardNotFoundException() {
        super("BoardNotFoundException", ErrorMessagerCode.BOARD_NOT_FOUND);
    }

    public BoardNotFoundException(String message) {
        super(message);
    }

    public BoardNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public BoardNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public BoardNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public BoardNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
