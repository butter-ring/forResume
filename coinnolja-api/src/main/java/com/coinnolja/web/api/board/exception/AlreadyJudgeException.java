package com.coinnolja.web.api.board.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class AlreadyJudgeException extends CnException {


    public AlreadyJudgeException() {
        super("AlreadyJudgeException", ErrorMessagerCode.ALREADY_JUDGE_EXCEPTION);
    }

    public AlreadyJudgeException(String message) {
        super(message);
    }

    public AlreadyJudgeException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public AlreadyJudgeException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public AlreadyJudgeException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public AlreadyJudgeException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
