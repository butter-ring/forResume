package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.constant.VoteType;
import com.coinnolja.web.api.board.model.Vote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends CrudRepository<Vote, Long> {

    int countAllByMemberIdAndBoardId(Long memberId, Long boardId);

    Vote findByMemberIdAndBoardId(Long memberId, Long boardId);

    int countAllByBoardIdAndVoteType(Long boardId, VoteType voteType);
}