package com.coinnolja.web.api.common.security.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * A a static class that abstracts a secret provider
 * Later this one can be changed with a better approach
 */
@Slf4j
@Component
public class JWTSecrets {

//    @Value("${jwt.secret}")
//    private void setSecret(String secret) {
//        DEFAULT_SECRET = secret;
//    }

    /**
     * A default secret for development purposes.
     */
//    public static String DEFAULT_SECRET;

    public static String DEFAULT_SECRET;

    public JWTSecrets(@Value("${jwt.secret}") String secret) {
        this.DEFAULT_SECRET = secret;
    }


}
