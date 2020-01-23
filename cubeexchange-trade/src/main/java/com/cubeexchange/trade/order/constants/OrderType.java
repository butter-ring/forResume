package com.cubeexchange.trade.order.constants;

public enum OrderType {
    LIMIT(0),
    MARKET(1);

    private OrderType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }


}
