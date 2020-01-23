package com.coinnolja.web.api.board.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class BoardMasterNotFoundException extends CnException {


    public BoardMasterNotFoundException() {
        super("BoardMasterNotFoundException", ErrorMessagerCode.BOARD_MASTER_NOT_FOUND);
    }

    public BoardMasterNotFoundException(String message) {
        super(message);
    }

    public BoardMasterNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public BoardMasterNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public BoardMasterNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public BoardMasterNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
