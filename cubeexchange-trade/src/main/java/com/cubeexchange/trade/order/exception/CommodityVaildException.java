package com.cubeexchange.trade.order.exception;


import com.cubeexchange.trade.common.exception.CnException;
import com.cubeexchange.trade.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class CommodityVaildException extends CnException {


    public CommodityVaildException() {
        super("CommodityVaildException");

    }

    public CommodityVaildException(String message) {
        super(message);
    }

    public CommodityVaildException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);

    }

    public CommodityVaildException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public CommodityVaildException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public CommodityVaildException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }


}
