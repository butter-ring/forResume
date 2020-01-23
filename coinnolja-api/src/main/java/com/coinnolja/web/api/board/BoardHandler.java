package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.board.model.Vote;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.mediacollection.MediaCollection;
import com.coinnolja.web.api.mediacollection.MediaCollectionRepository;
import com.coinnolja.web.api.member.MemberExperienceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;
import java.util.List;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Slf4j
@Component
public class BoardHandler {

    private final BoardService boardService;
    private final BoardRepository boardRepository;
    private final BoardMasterRepository boardmasterRepository;
    private final MemberExperienceService memberExperienceService;
    private final MediaCollectionRepository mediaCollectionRepository;

    public BoardHandler(
            BoardRepository boardRepository, BoardService boardService,
            BoardMasterRepository boardmasterRepository, MemberExperienceService memberExperienceService, MediaCollectionRepository mediaCollectionRepository) {
        this.boardRepository = boardRepository;
        this.boardService = boardService;
        this.boardmasterRepository = boardmasterRepository;
        this.memberExperienceService = memberExperienceService;
        this.mediaCollectionRepository = mediaCollectionRepository;
    }


    /**
     * GET Boards
     */

    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] BoardHandler::findAll call [-----[ ");
        Long boardMasterId = request.queryParam("boardMasterId").isPresent() ? Long.parseLong(request.queryParam("boardMasterId").get()) : 1;
        Paging paging = new Paging();
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 1;

        Integer pageSize = request.queryParam("pageSize").isPresent() ? Integer.parseInt(request.queryParam("pageSize").get()) : 16;
//        Integer pageSize = request.queryParam("pageSize").isPresent() ? Integer.parseInt(request.queryParam("pageSize").get()) : 16;
        String searchKey = request.queryParam("searchKey").isPresent() ? request.queryParam("searchKey").get() : "";
        String searchVal = request.queryParam("searchVal").isPresent() ? request.queryParam("searchVal").get() : "";

        paging.setPageIndex(page);
        paging.setPageSize(pageSize);
        paging.setSearchKey(searchKey);
        paging.setSearchVal(searchVal);

//        return boardService.findAll(paging, boardMasterId)
//                .flatMap(boards -> ok().body(fromObject(boards)))
//                .switchIfEmpty(notFound().build());

        Mono<ServerResponse> logOutStatus = boardService.findAll(paging, boardMasterId)
                .flatMap(boards -> ok().body(fromObject(boards)))
                .switchIfEmpty(notFound().build());


        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> boardService.findAllWithMember(paging, boardMasterId, memberId))
                .flatMap(boards -> ok().body(fromObject(boards)))
                .switchIfEmpty(logOutStatus);
    }

    /**
     * GET a Board
     */
    public Mono<ServerResponse> findById(ServerRequest request) {
        log.info("]-----] BoardHandler::findById call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        Mono<ServerResponse> logOutStatus = Mono.just(boardRepository.findById(id).get())
                .flatMap(board -> {
                    board.setReadCount(board.getReadCount() + 1);
//                    board.setReadCount(board.getReadCount() + 1);
                    boardRepository.save(board);
                    log.debug("]-----] getIsSecret [-----[ {}", board.getBoardMaster().getIsSecret());
                    if (board.getBoardMaster().getIsSecret() == 1) {
                        board.setTitle("비밀글 입니다.");
                        board.setContent("비밀글 입니다.");

                    }
                    List<MediaCollection> mediaCollections = mediaCollectionRepository.findAllByCollectionUuidAndActive(board.getCollectionUuid(), 1);
                    if (mediaCollections != null) {
                        board.setMediaCollections(mediaCollections);
                    }
                    return Mono.justOrEmpty(board);
                })
                .flatMap(board -> {
                    Board boardNext = boardRepository.findNextBoard(board.getId(), board.getBoardMasterId(), 1);
                    if (boardNext != null) {
                        board.setNextBoard(boardNext);
                    }
                    Board boardPrev = boardRepository.findPrevBoard(board.getId(), board.getBoardMasterId(), 1);
                    if (boardPrev != null) {
                        board.setPrevBoard(boardPrev);
                    }
                    return Mono.justOrEmpty(board);
                })
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    Board board = boardRepository.findById(id).get();
                    board.setReadCount(board.getReadCount() + 1);
                    boardRepository.save(board);
                    log.debug("]-----] getIsSecret [-----[ {}", board.getBoardMaster().getIsSecret());
                    if (board.getBoardMaster().getIsSecret() == 1) {
                        if (!board.getMemberId().equals(memberId)) {
                            board.setTitle("비밀글 입니다.");
                            board.setContent("비밀글 입니다.");
                        }
                    }
                    List<MediaCollection> mediaCollections = mediaCollectionRepository.findAllByCollectionUuidAndActive(board.getCollectionUuid(), 1);
                    if (mediaCollections != null) {
                        board.setMediaCollections(mediaCollections);
                    }
                    return Mono.justOrEmpty(board);
                })
                .flatMap(board -> {
                    Board boardNext = boardRepository.findNextBoard(board.getId(), board.getBoardMasterId(), 1);
                    if (boardNext != null) {
                        board.setNextBoard(boardNext);
                    }
                    Board boardPrev = boardRepository.findPrevBoard(board.getId(), board.getBoardMasterId(), 1);
                    if (boardPrev != null) {
                        board.setPrevBoard(boardPrev);
                    }
                    return Mono.justOrEmpty(board);
                })
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(logOutStatus);
    }

    /**
     * POST a Board
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> save(ServerRequest request) {
        log.info("]-----] BoardHandler::save call [-----[ ");
//        InetSocketAddress ipAddress = request.remoteAddress().get();
        List<String> ipAddressWrap = request.headers().header("X-FORWARDED-FOR");
//        String ipAddress = ipAddressWrap.get(0);
//        if (ipAddressWrap.size() > 0) {
//            ipAddress = ipAddressWrap.get(0);
//        }
//        request.getHeader("X-FORWARDED-FOR");
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(Board.class)
                        .flatMap(board -> boardService.save(board, memberId, ipAddressWrap)
                        ))
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());
    }

    /**
     * PUT a Board
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> put(ServerRequest request) {
        log.info("]-----] BoardHandler::put call [-----[ ");

        Long id = Long.parseLong(request.pathVariable("id"));
        log.debug("]-----] BoardHandler::put id [-----[ {}", id);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(Board.class)
                        .flatMap(board -> boardService.put(board, memberId, id)))
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(badRequest().build());
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
                .flatMap(memberId -> request.bodyToMono(Vote.class)
                        .flatMap(vote -> {
                            vote.setMemberId(memberId);
                            return boardService.vote(vote, ipAddress);
                        }))
                .flatMap(vote -> ok().body(fromObject(vote)))
                .switchIfEmpty(notFound().build());
    }


    /**
     * GET a Board
     */
    public Mono<ServerResponse> findBoardMasterById(ServerRequest request) {
        log.info("]-----] BoardHandler::findById call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        return Mono.just(boardmasterRepository.findById(id).get())
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());

    }


    /**
     * GET Boards
     */

    public Mono<ServerResponse> findRank(ServerRequest request) {
        log.info("]-----] BoardHandler::findRank call [-----[ ");
        return Mono.just(boardRepository.findBoardByRank())
                .flatMap(boards -> ok().body(fromObject(boards)))
                .switchIfEmpty(notFound().build());
    }


    public Mono<ServerResponse> findTop(ServerRequest request) {
        log.info("]-----] BoardHandler::findTop call [-----[ ");
        Long boardMasterId = Long.parseLong(request.pathVariable("boardMasterId"));
        return boardService.findTop(boardMasterId)
                .flatMap(boards -> ok().body(fromObject(boards)))
                .switchIfEmpty(notFound().build());
    }
}
