package com.coinnolja.web.api.judge;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyJudgeRepository extends CrudRepository<ReplyJudge, Long> {

    int countAllByMemberIdAndReplyId(Long memberId, Long replyId);

    int countAllByReplyId(Long replyId);
}