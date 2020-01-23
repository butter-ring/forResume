package com.coinnolja.web.api.common.model;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
public class BaseDTO implements Serializable {

    private Long id;

    private int active = 1;

    private Long createdAt = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();

    private Long updatedAt = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();




}
