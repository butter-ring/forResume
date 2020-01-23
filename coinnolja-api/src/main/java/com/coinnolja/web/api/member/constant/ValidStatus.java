package com.coinnolja.web.api.member.constant;

public enum ValidStatus {
    NOTYET(0) {
        @Override
        public String shout() {
            return "NOTYET";
        }
    },
    DONE(1) {
        @Override
        public String shout() {
            return "DONE";
        }
    },
    DOING(2) {
        @Override
        public String shout() {
            return "DOING";
        }
    };

    private ValidStatus(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract String shout();

}