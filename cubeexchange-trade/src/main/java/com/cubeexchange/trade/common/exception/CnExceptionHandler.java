package com.cubeexchange.trade.common.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

@Component
@Order(-2)
@Slf4j
public class CnExceptionHandler implements WebExceptionHandler {

    private ObjectMapper objectMapper;

    public CnExceptionHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
//        log.debug("]-----] UserExceptionHandler::handle httpStatus [-----[ {}", );
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON_UTF8);
        exchange.getResponse().getHeaders().setAccessControlAllowOrigin("*");
        if (ex instanceof CnException) {
            CnException cnException = (CnException) ex;
            log.debug("]-----] UserExceptionHandler::handle httpStatus [-----[ {}", cnException.getHttpStatus());
            log.debug("]-----] UserExceptionHandler::handle ex [-----[ {}", cnException.getMessage());
            exchange.getResponse().setStatusCode(cnException.getHttpStatus());
            CnErrors errors = new CnErrors(cnException.getErrorMessagerCode().getCode(), cnException.getErrorMessagerCode().getResponseValue());
            if (cnException.getErrors() != null) {
                if (cnException.getErrors().size() > 0) {
                    cnException.getErrors().forEach(e -> errors.add(e.getPath(), e.getCode(), e.getMessage()));
                }
            }

            try {
                DataBuffer db = new DefaultDataBufferFactory().wrap(objectMapper.writeValueAsBytes(errors));
                // marks the response as complete and forbids writing to it
                return exchange.getResponse().writeWith(Mono.just(db));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return Mono.empty();

            }
        }

//        } else if (ex instanceof ExpiredJwtException) {
//            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//
//            return exchange.getResponse().setComplete();
//
//        }
//        ExpiredJwtException

        return Mono.error(ex);
    }
}
