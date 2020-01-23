package com.coinnolja.web.api.sample;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class SampleHandler {

    private final SampleRepository sampleRepository;

    public SampleHandler(SampleRepository sampleRepository) {
        this.sampleRepository = sampleRepository;
    }


    /**
     * GET Samples
     */
//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] SampleHandler::findAll call [-----[ ");
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) - 1 : 0;
        Integer size = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 20;
        Sort sort = new Sort(Sort.Direction.DESC, "createdAt");
        return Mono.just(sampleRepository.findAll(PageRequest.of(page, size, sort)))
                .flatMap(samples -> ok().body(fromObject(samples)))
                .switchIfEmpty(notFound().build());

    }

    /**
     * GET a Sample
     */
//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public Mono<ServerResponse> findById(ServerRequest request) {
        log.info("]-----] SampleHandler::findById call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        return Mono.just(sampleRepository.findById(id).get())
                .flatMap(sample -> ok().body(fromObject(sample)))
                .switchIfEmpty(notFound().build());

    }


    /**
     * POST a Sample
     */
//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public Mono<ServerResponse> save(ServerRequest request) {
        log.info("]-----] SampleHandler::save call [-----[ ");

        return request.bodyToMono(Sample.class)
                .flatMap(sample -> Mono.just(sampleRepository.save(sample)))
                .flatMap(sample -> ok().body(fromObject(sample)))
                .switchIfEmpty(notFound().build());

    }


}
