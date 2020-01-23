package com.coinnolja.web.api.member.constant;

public enum ExperienceType {


    SIGNUP(0) {
        @Override
        public int shout() {
            return 10;
        }
    },
    ATTENDANCE(1) {
        @Override
        public int shout() {
            return 100;
        }
    },
    WRITE(2) {
        @Override
        public int shout() {
            return 10;
        }
    },
    REPLY(3) {
        @Override
        public int shout() {
            return 10;
        }
    },
    VOTE(4) {
        @Override
        public int shout() {
            return 10;
        }
    },
    WRITE_INFO(5) {
        @Override
        public int shout() {
            return 20;
        }
    };
    private ExperienceType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract int shout();

}
