package com.coinnolja.web.api.member;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;
import java.util.Optional;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class MemberExperienceHandler {

    private final MemberExperienceRepository memberExperienceRepository;

    public MemberExperienceHandler(MemberExperienceRepository memberExperienceRepository) {
        this.memberExperienceRepository = memberExperienceRepository;
    }

    /**
     * GET MemberExperience
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] MemberExperienceHandler::findAll call [-----[ ");
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 0;
        Integer size = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 10;

        Sort sort = new Sort(Sort.Direction.DESC, "id");
        return
                request.principal()
                        .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                        .flatMap(memberId -> Mono.just(memberExperienceRepository.findAllByMemberId(PageRequest.of(page, size, sort), memberId)))
                        .flatMap(samples -> ok().body(fromObject(samples)))
                        .switchIfEmpty(notFound().build());

    }

}



