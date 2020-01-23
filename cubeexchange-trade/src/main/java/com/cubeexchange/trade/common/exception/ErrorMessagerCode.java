package com.cubeexchange.trade.common.exception;

public enum ErrorMessagerCode {

    SUCCESS(200000, "Ok"),
    ERROR(500000, "Fail"),

    //order
    MEMBERID_IS_EMPTY(500100, "memberid is empty"),
    MEMBER_NOT_FOUND(500101, "member not found"),
    SYMBOL_IS_EMPTY(500102, "symbol is empty"),
    CURRENCY_IS_EMPTY(500103, "currency is empty"),
    ORDER_PRICE_NOT_ACCEPTABLE(500104, "order price not acceptable"),
    ORDER_VOLUME_NOT_ACCEPTABLE(500105, "order volume not acceptable"),
    COMMODITY_NOT_FOUND(500106, "commodity not found"),
    COMMODITY_NOT_AVAILABLE(500107, "commodity not available"),

    ACCOUNT_NOT_FOUND(500108, "account not found"),
    ACCOUNT_NOT_AVAILABLE(500109, "account not available"),
    ORDER_POSITION_NOT_ACCEPTABLE(500110, "order position not acceptable"),
    AVAILABLE_BALANCE_NOT_ENOUGH(500111, "available balance not enough"),
    ORDER_STATUS_NOT_ACCEPTABLE(500112, "order status not acceptable"),

    ORDER_OUTSTANDING_NOT_FOUND(500201, "order outstanding not found"),

    DUMMY(900000, "Dummy");


    ErrorMessagerCode(final int codeValue, final String responseValue) {
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

