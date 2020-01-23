package com.cubeexchange.web.api.common.exception;

import org.springframework.http.HttpStatus;

import java.util.List;

public class CnException extends RuntimeException {

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    private ErrorMessagerCode errorMessagerCode = ErrorMessagerCode.ERROR;
    private List<CnError> errors;


    public CnException(String message) {
        super(message);
    }

    public CnException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public CnException(String message, HttpStatus httpStatus, ErrorMessagerCode errorMessagerCode) {
        super(message);
        this.httpStatus = httpStatus;
        this.errorMessagerCode = errorMessagerCode;
    }

    public CnException(String message, ErrorMessagerCode errorMessagerCode) {
        super(message);
        this.errorMessagerCode = errorMessagerCode;
    }

    public CnException(ErrorMessagerCode errorMessagerCode) {
        this.errorMessagerCode = errorMessagerCode;
    }


    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    public ErrorMessagerCode getErrorMessagerCode() {
        return this.errorMessagerCode;
    }

    public List<CnError> getErrors() {
        return this.errors;
    }

    public void setErrors(List<CnError> errors) {
        this.errors = errors;
    }
}
