package com.coinnolja.web.api.reply;

import com.coinnolja.web.api.board.model.Vote;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.member.MemberExperienceService;
import com.coinnolja.web.api.member.constant.ExperienceType;
import com.coinnolja.web.api.member.exception.MemberNotFoundException;
import com.coinnolja.web.api.member.exception.UserNameIsAlreadyExistsException;
import com.coinnolja.web.api.member.model.MemberNote;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class ReplyHandler {

    private final ReplyRepository replyRepository;
    private final ReplyService replyService;
    private final MemberExperienceService memberExperienceService;

    public ReplyHandler(ReplyRepository replyRepository, ReplyService replyService, MemberExperienceService memberExperienceService) {
        this.replyRepository = replyRepository;
        this.replyService = replyService;
        this.memberExperienceService = memberExperienceService;
    }

    /**
     * GET Replies
     */
    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] ReplyHandler::findAll call [-----[ ");
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 0;
        Integer size = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;
        Long parentId = request.queryParam("parentId").isPresent() ? Long.parseLong(request.queryParam("parentId").get()) : 0;
        Long boardId = Long.parseLong(request.pathVariable("boardId"));
        Sort sort = new Sort(Sort.Direction.DESC, "createdAt");

        return Mono.just(replyRepository.findAllByBoardIdAndActiveAndParentIdAndJudgeCountLessThan(PageRequest.of(page, size, sort), boardId, 1, parentId, 11))
                .flatMap(samples -> ok().body(fromObject(samples)))
                .switchIfEmpty(notFound().build());
    }


    public Mono<ServerResponse> findAllAsc(ServerRequest request) {
        log.info("]-----] ReplyHandler::findAllAsc call [-----[ ");
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 1;
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 20;
        Long boardId = Long.parseLong(request.pathVariable("boardId"));

        Paging paging = new Paging();
        paging.setPageIndex(page);
        paging.setPageSize(pageSize);

        return replyService.findAllAsc(paging, boardId)
                .flatMap(samples -> ok().body(fromObject(samples)))
                .switchIfEmpty(notFound().build());
    }

    /**
     * POST a Reply
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> save(ServerRequest request) {
        log.info("]-----] ReplyHandler::save call [-----[ ");
        InetSocketAddress ipAddress = request.remoteAddress().get();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(Reply.class)
                        .flatMap(reply -> Mono.just(
                                replyService.saveAsc(reply, memberId)
                        )).doOnSuccess(r -> memberExperienceService.putExperience(memberId, ExperienceType.REPLY, ipAddress.getAddress().getHostAddress())))
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());
    }

    /**
     * 댓글 수정
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> edit(ServerRequest request) {
        log.info("]-----] ReplyHandler::edit call [-----[ ");

        Mono<Reply> replyMono = request.bodyToMono(Reply.class);

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> replyMono.flatMap(replyMonoData -> {
                    if(memberId != replyMonoData.getParentId()){
                        return Mono.error(new MemberNotFoundException());
                    }
                    Reply reply;
                    reply = replyRepository.findByIdAndBoardIdAndActive(replyMonoData.getParentId(), replyMonoData.getBoardId(), 1);
                    reply.setContent(replyMonoData.getContent());
                    return Mono.just(replyRepository.save(reply));

                }))
                .flatMap(Reply -> ok().body(fromObject(Reply)))
                .switchIfEmpty(notFound().build());
    }

    /**
     * POST a Vote
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> vote(ServerRequest request) {
        log.info("]-----] BoardHandler::vote call [-----[ ");
        InetSocketAddress ipAddress = request.remoteAddress().get();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(VoteReply.class)
                        .flatMap(vote -> {
                            vote.setMemberId(memberId);
                            return replyService.vote(vote, ipAddress);
                        }))
                .flatMap(vote -> ok().body(fromObject(vote)))
                .switchIfEmpty(notFound().build());
    }




}
