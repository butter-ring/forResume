package com.cubeexchange.trade.filled.constants;

public enum FilledType {
    MAKER(0),
    TAKER(1);

    private FilledType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }


}
