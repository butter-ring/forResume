package com.coinnolja.web.api.judge;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardJudgeRepository extends CrudRepository<BoardJudge, Long> {

    int countAllByMemberIdAndBoardId(Long memberId, Long boardId);

    BoardJudge findByMemberIdAndBoardId(Long memberId, Long boardId);

    int countAllByBoardId(Long boardId);
}