package com.coinnolja.web.api.judge;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class JudgeHandler {

    private final JudgeService judgeService;

    public JudgeHandler(JudgeService judgeService) {
        this.judgeService = judgeService;
    }


    /**
     * POST a Judge Board
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> boardJudge(ServerRequest request) {
        log.info("]-----] BoardHandler::boardJudge call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(BoardJudge.class)
                        .flatMap(boardJudge -> {
                            boardJudge.setMemberId(memberId);
                            return judgeService.boardJudge(boardJudge);
                        }))
                .flatMap(vote -> ok().body(fromObject(vote)))
                .switchIfEmpty(notFound().build());
    }

    /**
     * POST a Reply Judge
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> replyJudge(ServerRequest request) {
        log.info("]-----] BoardHandler::boardJudge call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(ReplyJudge.class)
                        .flatMap(replyJudge -> {
                            replyJudge.setMemberId(memberId);
                            return judgeService.replyJudge(replyJudge);
                        }))
                .flatMap(vote -> ok().body(fromObject(vote)))
                .switchIfEmpty(notFound().build());
    }


}
