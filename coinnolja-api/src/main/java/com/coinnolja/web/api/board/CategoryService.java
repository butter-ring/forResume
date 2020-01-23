package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.model.Category;
import com.coinnolja.web.api.member.model.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    @Cacheable("board.category")
    public List<Category> findAll() throws DataAccessException {

        return categoryRepository.findAllByActiveAndIsRoot(1, true);
    }


}
