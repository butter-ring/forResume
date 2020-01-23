package com.cubeexchange.trade.order.constants;

public enum OrderStatus {
    NEW(0),
    CANCEL(1),
    FILLED(2),
    REJECT(3);

    private OrderStatus(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }


}
