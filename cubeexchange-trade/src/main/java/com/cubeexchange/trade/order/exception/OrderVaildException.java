package com.cubeexchange.trade.order.exception;


import com.cubeexchange.trade.common.exception.CnException;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class OrderVaildException extends CnException {


    public OrderVaildException() {
        super("OrderVaildException");

    }

    public OrderVaildException(String message) {
        super(message);
    }

    public OrderVaildException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public OrderVaildException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public OrderVaildException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public OrderVaildException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
