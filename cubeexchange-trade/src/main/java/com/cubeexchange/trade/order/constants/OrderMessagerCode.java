package com.cubeexchange.trade.order.constants;

public enum OrderMessagerCode {

    ORDER_COMPLETE(200000, "order complete"),
    DUMMY(900000, "Dummy");


    OrderMessagerCode(final int codeValue, final String responseValue) {
        this.codeValue = codeValue;
        this.responseValue = responseValue;
    }

    private int codeValue;
    private String responseValue;

    public int getCode() {
        return codeValue;
    }

    public String getResponseValue() {
        return responseValue;
    }

}

