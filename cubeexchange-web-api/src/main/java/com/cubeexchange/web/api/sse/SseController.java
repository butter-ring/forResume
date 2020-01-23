package com.cubeexchange.web.api.sse;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Slf4j
@RestController
@Component
@RequestMapping("/stream-sse")
public class SseController {

    @Autowired
    private SseService sseService;

    @GetMapping("/stream-sse")
    public Flux<ServerSentEvent<String>> streamEvents(String message) {
         log.debug("]-----] SseController::streamEvents message [-----[ {}", message);

        return Flux.interval(Duration.ofMillis(100))
                .map(sequence -> {
                    log.debug("]-----] SseController::streamEvents message2222 [-----[ {}", message);
                    log.debug("]-----] SseController::streamEvents sequence [-----[ {}", sequence);
                    return ServerSentEvent.<String> builder()
                            .id(String.valueOf(sequence))
                            .event("order")
                            .data(message)
                            .build();
                });
    }

//    @Autowired
//    public SseController(@NonNull SseService sseService) {
//        this.sseService = sseService;
//    }
//
//    @GetMapping(produces = "application/stream+json")
//    public Flux<String> streamEvents(String message) {
//
//        return Flux.interval(Duration.ofSeconds(1))
//                .flatMap(message -> sseService.get)
//    }
}
