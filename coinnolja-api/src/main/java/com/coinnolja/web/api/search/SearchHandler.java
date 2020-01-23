package com.coinnolja.web.api.search;

import com.coinnolja.web.api.board.BoardRepository;
import com.coinnolja.web.api.board.BoardService;
import com.coinnolja.web.api.board.mapper.BoardList;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.member.exception.UserNameIsAlreadyExistsException;
import com.coinnolja.web.api.search.mapper.SearchMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class SearchHandler {

    private final BoardRepository boardRepository;
    private final BoardService boardService;
    private final SearchMapper searchMapper;

    public SearchHandler(
            BoardRepository boardRepository, BoardService boardService,
            SearchMapper searchMapper) {
        this.boardRepository = boardRepository;
        this.boardService = boardService;
        this.searchMapper = searchMapper;
    }


    /**
     * GET Boards
     */

    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] SearchHandler::findAll call [-----[ ");
        Paging paging = new Paging();
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 1;

        // ServerResponse serverResponse = new ServerResponse();

        Integer pageSize = request.queryParam("pageSize").isPresent() ? Integer.parseInt(request.queryParam("pageSize").get()) : 16;
        String searchVal = request.queryParam("searchVal").get();
        paging.setPageIndex(page);
        paging.setPageSize(pageSize);
        paging.setSearchVal(searchVal.trim());

        return boardService.findAllForSearch(paging)
                .flatMap(boards -> ok().body(fromObject(boards)))
                .switchIfEmpty(notFound().build());
    }


    /**
     * findRank
     */

    public Mono<ServerResponse> findRank(ServerRequest request) {

        return Mono.justOrEmpty(searchMapper.findRank())
                .flatMap(boards -> ok().body(fromObject(boards)))
                .switchIfEmpty(notFound().build());
    }


}
