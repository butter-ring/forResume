package com.cubeexchange.web.api.common.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Siteverify {

    private String secret;
    private String response;
    private String remoteip;

    private Boolean success;
    private String challengeTs;
    private String hostname;
    private Double score;
    private String action;
    private String[] errorCodes;
}
