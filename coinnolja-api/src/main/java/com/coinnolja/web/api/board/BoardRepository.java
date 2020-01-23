package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends CrudRepository<Board, Long> {
    Page<Board> findAll(Pageable pageable);

    Page<Board> findAllByBoardMasterIdAndActive(Pageable pageable, Long boardMasterId, int active);

    List<Board> findTop5ByMemberIdAndActive(Long memberId, int active);

    Page<Board> findAllByMemberIdAndActiveOrderByCreatedAtDesc(Pageable pageable, Long memberId, int active);

    @Query(value = "select * from board where active = 1 and created_at  >= UNIX_TIMESTAMP(date_sub(CURRENT_TIMESTAMP(), interval 300 hour)) * 1000 order by read_count desc limit 10", nativeQuery = true)
    List<Board> findBoardByRank();

    @Query(value = "select * from board where active = :active and board_master_id = :boardMasterId and id > :boardId order by id asc limit 1", nativeQuery = true)
    Board findNextBoard(@Param("boardId") Long boardId, @Param("boardMasterId") Long boardMasterId, @Param("active") int active);

    @Query(value = "select * from board where active = :active and board_master_id = :boardMasterId and id < :boardId order by id desc limit 1", nativeQuery = true)
    Board findPrevBoard(@Param("boardId") Long boardId, @Param("boardMasterId") Long boardMasterId, @Param("active") int active);

}