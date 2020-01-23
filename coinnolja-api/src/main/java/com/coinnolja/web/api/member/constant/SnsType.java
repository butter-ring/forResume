package com.coinnolja.web.api.member.constant;

public enum SnsType {

    FACEBOOK("FB"),
    KAKAOTALK("KT");

    SnsType(final String codeValue) {
        this.codeValue = codeValue;
    }

    private String codeValue;

    public String getCode() {
        return codeValue;
    }



}
