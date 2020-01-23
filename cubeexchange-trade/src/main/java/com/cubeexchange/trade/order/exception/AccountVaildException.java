package com.cubeexchange.trade.order.exception;


import com.cubeexchange.trade.common.exception.CnException;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class AccountVaildException extends CnException {


    public AccountVaildException() {
        super("AccountVaildException");

    }

    public AccountVaildException(String message) {
        super(message);
    }

    public AccountVaildException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public AccountVaildException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public AccountVaildException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public AccountVaildException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
