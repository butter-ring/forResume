package com.coinnolja.web.api.board.constant;

public enum VoteType {
    UP(0) {
        @Override
        public String shout() {
            return "UP";
        }

    },
    DOWN(1) {
        @Override
        public String shout() {
            return "DOWN";
        }

    };

    private VoteType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract String shout();

}
