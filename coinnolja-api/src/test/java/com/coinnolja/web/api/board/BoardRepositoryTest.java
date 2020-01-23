package com.coinnolja.web.api.board;

import com.coinnolja.web.api.ApiApplicationTests;
import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.board.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@ActiveProfiles("local")
public class BoardRepositoryTest extends ApiApplicationTests {

    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void saveTest(){
        Board board = new Board();
        board.setTitle("test6");
        board.setMemberId(1L);
        board.setContent("board Test6");
        board.setUpVoteCount(0);
        board.setDownVoteCount(0);
        board.setBoardMasterId(1L);
        board.setReadCount(3);

        boardRepository.save(board);

    }

    @Test
    public void findTest(){
        log.debug("88888888888888888888//////////////==============///////////////111111111111222222222222222");
        //log.debug("]-----] boardRepositoryfindAllByActive [-----[ {}", boardRepository.findAllByActive(1));

    }

    @Test
    public void findAll() {
     //   boardRepository.findAllByActive(1);
        //@Query(value = "select b from Board b where active = :active and title = :title")
        //MemberAdmin findBoardByActiveAndTitle(Integer active, String title);



    }

    @Test
    public void findTop5ByMemberIdAndActiveTest() {
        List<Board> boardList = new ArrayList<>();
        boardList = boardRepository.findTop5ByMemberIdAndActive(4L, 1);
        for(int i=0; i<boardList.size(); i++) {
            log.debug("]-----] findAllByMemberIdTest [-----[ {}", boardList.get(i));
        }



    }



}