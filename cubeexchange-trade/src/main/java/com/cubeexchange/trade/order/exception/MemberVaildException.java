package com.cubeexchange.trade.order.exception;


import com.cubeexchange.trade.common.exception.CnException;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class MemberVaildException extends CnException {


    public MemberVaildException() {
        super("MemberIdIsEmptyException");

    }

    public MemberVaildException(String message) {
        super(message);
    }

    public MemberVaildException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public MemberVaildException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public MemberVaildException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public MemberVaildException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
