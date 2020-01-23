package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.model.Category;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

//    @Transactional(readOnly = true)
//    @Cacheable("board.category")
//    List<Category> findAll() throws DataAccessException;


    List<Category> findAllByActiveAndIsRoot(int active, boolean isRoot) throws DataAccessException;

}