package com.coinnolja.web.api.board.constant;

public enum BoardType {
    NORMAL(0) {
        @Override
        public String shout() {
            return "NM";
        }

    },
    GALLERY(1) {
        @Override
        public String shout() {
            return "GL";
        }

    };

    private BoardType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract String shout();

}
