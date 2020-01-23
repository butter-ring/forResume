package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.notFound;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class CategoryHandler {

    private final CategoryService categoryService;

    public CategoryHandler(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    /**
     * GET Category
     */
    public Mono<ServerResponse> findAll(ServerRequest request) {
        log.info("]-----] CategoryHandler::findAll call [-----[ ");
        List<Category> categorieList = categoryService.findAll();
        log.info("]-----] CategoryHandler::findAll  categorieList [-----[ {}", categorieList);
//        log.info("]-----] CategoryHandler::findAll  categorieList [-----[ {}", categorieList.get(6));
        return Mono.just(categorieList)
                .flatMap(categories -> ok().body(fromObject(categories)))
                .switchIfEmpty(notFound().build());

    }


}
