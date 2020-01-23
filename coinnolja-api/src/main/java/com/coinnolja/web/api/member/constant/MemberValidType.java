package com.coinnolja.web.api.member.constant;

public enum MemberValidType {
    EMAIL(0) {
        @Override
        public String shout() {
            return "EMAIL";
        }

    },
    PHONE(1) {
        @Override
        public String shout() {
            return "PHONE";
        }
    },
    GOOGLE_AUTH(2) {
        @Override
        public String shout() {
            return "GOOGLE_AUTH";
        }
    };

    private MemberValidType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract String shout();

}