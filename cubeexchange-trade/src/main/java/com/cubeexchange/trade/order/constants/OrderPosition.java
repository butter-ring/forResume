package com.cubeexchange.trade.order.constants;

public enum OrderPosition {
    BUY(0),
    SELL(1);

    private OrderPosition(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }


}
