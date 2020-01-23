package com.cubeexchange.web.api.common.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class SiteverifyUtil {

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;

    private final RestTemplate restTemplate;

    public SiteverifyUtil() {
        this.restTemplate = new RestTemplate();
    }

    public Siteverify siteverifyToken(String token) {

        Siteverify siteverify = new Siteverify();
        siteverify.setSecret(recaptchaSecret);
        siteverify.setResponse(token);
        HttpEntity<Siteverify> request = new HttpEntity<>(siteverify);
        ResponseEntity<Siteverify> response = restTemplate.postForEntity("https://www.google.com/recaptcha/api/siteverify?secret=" + recaptchaSecret + "&response=" + token, request, Siteverify.class);
        log.debug("]-----] response [-----[ {}", response);
        if (response.getBody() != null) {
            if (response.getBody().getSuccess()) {
                return response.getBody();
            } else {
                throw new SiteverifyException();
            }
        } else {
            throw new SiteverifyException();
        }

    }
}
