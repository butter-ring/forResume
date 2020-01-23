package com.coinnolja.web.api.board.constant;

public enum SubType {
    NORMAL(0) {
        @Override
        public String shout() {
            return "NM";
        }

    },
    INFO(1) {
        @Override
        public String shout() {
            return "IN";
        }

    };
    private SubType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract String shout();

}
