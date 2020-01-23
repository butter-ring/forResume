package com.coinnolja.web.api.reply;

import com.amazonaws.services.securityhub.model.Note;
import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.member.model.MemberNote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends CrudRepository<Reply, Long> {

    Page<Reply> findAllByBoardIdAndActiveAndParentIdAndJudgeCountLessThan(Pageable pageable, Long boardId, int active, Long parentId, int lessthan);

    Page<Reply> findAllByMemberIdAndActiveOrderByCreatedAtDesc(Pageable pageable, Long memberId, int active);

    List<Reply> findTop5ByMemberIdAndActiveOrderByCreatedAtDesc(Long memberId, int active);

    Reply findByIdAndBoardIdAndActive(Long Id, Long boardId, int active);

    int countAllByBoardIdAndActive(Long boardId, int active);
    int countAllByParentIdAndActive(Long parentId, int active);
}