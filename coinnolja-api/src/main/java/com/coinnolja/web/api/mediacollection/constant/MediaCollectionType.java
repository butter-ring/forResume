package com.coinnolja.web.api.mediacollection.constant;

public enum MediaCollectionType {
    IMAGE(0) {
        @Override
        public String shout() {
            return "IMAGE";
        }

    },
    YOUTUBE(1) {
        @Override
        public String shout() {
            return "YOUTUBE";
        }
    },
    VIMEO(2) {
        @Override
        public String shout() {
            return "VIMEO";
        }
    };

    private MediaCollectionType(final int codeValue) {
        this.codeValue = codeValue;
    }

    private int codeValue;

    public int getCode() {
        return codeValue;
    }

    public abstract String shout();

}
