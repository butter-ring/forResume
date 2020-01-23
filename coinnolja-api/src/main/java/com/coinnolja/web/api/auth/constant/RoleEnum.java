package com.coinnolja.web.api.auth.constant;

public enum RoleEnum {
    ADMIN("ROLE_ADMIN") {
        @Override
        public String shout() {
            return "ADMIN";
        }
    },
    USER("ROLE_USER") {
        @Override
        public String shout() {
            return "USER";
        }
    },
    GUEST("ROLE_GUEST") {
        @Override
        public String shout() {
            return "GUEST";
        }
    };

    private String codeValue;

    RoleEnum(String codeValue) {
        this.codeValue = codeValue;
    }

    public String getCode() {
        return this.codeValue;
    }

    public abstract String shout();
}
