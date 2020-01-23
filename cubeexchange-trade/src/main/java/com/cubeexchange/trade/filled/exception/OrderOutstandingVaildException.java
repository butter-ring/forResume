package com.cubeexchange.trade.filled.exception;


import com.cubeexchange.trade.common.exception.CnException;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class OrderOutstandingVaildException extends CnException {


    public OrderOutstandingVaildException() {
        super("OrderOutstandingVaildException");

    }

    public OrderOutstandingVaildException(String message) {
        super(message);
    }

    public OrderOutstandingVaildException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public OrderOutstandingVaildException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public OrderOutstandingVaildException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public OrderOutstandingVaildException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
