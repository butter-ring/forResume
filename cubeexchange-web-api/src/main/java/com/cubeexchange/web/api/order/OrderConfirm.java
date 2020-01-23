package com.cubeexchange.web.api.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderConfirm {

    private Long memberId;
    private Order order;
    private String message;
    private Integer messageCode;


}
