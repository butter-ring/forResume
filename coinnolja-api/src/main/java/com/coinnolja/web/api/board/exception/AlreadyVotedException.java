package com.coinnolja.web.api.board.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class AlreadyVotedException extends CnException {


    public AlreadyVotedException() {
        super("AlreadyVotedException", ErrorMessagerCode.ALREADY_VOTED_EXCEPTION);
    }

    public AlreadyVotedException(String message) {
        super(message);
    }

    public AlreadyVotedException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public AlreadyVotedException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public AlreadyVotedException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public AlreadyVotedException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
