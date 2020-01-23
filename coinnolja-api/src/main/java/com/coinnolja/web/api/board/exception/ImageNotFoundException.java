package com.coinnolja.web.api.board.exception;

import com.coinnolja.web.api.common.exception.CnException;
import com.coinnolja.web.api.common.exception.ErrorMessagerCode;
import org.springframework.http.HttpStatus;

public class ImageNotFoundException extends CnException {


    public ImageNotFoundException() {
        super("ImageNotFoundException", ErrorMessagerCode.IMAGE_NOT_FOUND);
    }

    public ImageNotFoundException(String message) {
        super(message);
    }

    public ImageNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public ImageNotFoundException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message, httpStatus, errorMessagerCode);
    }

    public ImageNotFoundException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message, errorMessagerCode);
    }

    public ImageNotFoundException(ErrorMessagerCode errorMessagerCode) {
        super(errorMessagerCode);

    }

}
