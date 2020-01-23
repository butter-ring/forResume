package com.coinnolja.web.api.reply;

import com.coinnolja.web.api.board.constant.VoteType;
import com.coinnolja.web.api.board.model.Vote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteReplyRepository extends CrudRepository<VoteReply, Long> {

    int countAllByMemberIdAndReplyId(Long memberId, Long replyId);

    VoteReply findByMemberIdAndReplyId(Long memberId, Long replyId);

    int countAllByReplyIdAndVoteType(Long replyId, VoteType voteType);
}