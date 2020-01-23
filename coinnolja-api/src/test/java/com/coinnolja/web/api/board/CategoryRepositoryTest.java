package com.coinnolja.web.api.board;

import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.board.model.Category;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.Assert.*;

@ActiveProfiles("local")
public class CategoryRepositoryTest extends ApiApplicationTests {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void saveTest(){
        Category category = new Category();
        category.setRoot(true);
        category.setTitle("dodododo");
        Category categorySaved = categoryRepository.save(category);
        log.debug("]-----] categorySaved [-----[ {}", categorySaved);

        Category categorySub = new Category();
        categorySub.setRoot(false);
        categorySub.setTitle("category sub");
        categorySub.setParentId(categorySaved.getId());
        log.debug("]-----] categorySub [-----[ {}", categorySub);
        categoryRepository.save(categorySub);

        Category categoryRoot = categoryRepository.findById(1l).get();
        log.debug("]-----] categoryRoot [-----[ {}", categoryRoot);

        Category categorysub = categoryRepository.findById(2l).get();
        log.debug("]-----] categorysub [-----[ {}", categorysub);

    }

    @Test
    public void findTest(){

//        Category categoryRoot = categoryRepository.findById(7l).get();
//        log.debug("]-----] categoryRoot [-----[ {}", categoryRoot.getChildren());

        Category categorysub = categoryRepository.findById(8l).get();
        log.debug("]-----] categorysub [-----[ {}", categorysub.getChildren());
    }
}