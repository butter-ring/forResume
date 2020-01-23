package com.coinnolja.web.api.judge;

import com.coinnolja.web.api.board.BoardRepository;
import com.coinnolja.web.api.board.exception.AlreadyJudgeException;
import com.coinnolja.web.api.board.exception.AlreadyVotedException;
import com.coinnolja.web.api.board.exception.BoardNotFoundException;
import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.reply.Reply;
import com.coinnolja.web.api.reply.ReplyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Slf4j
@Service
public class JudgeService {


    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    private final ReplyJudgeRepository replyJudgeRepository;
    private final BoardJudgeRepository boardJudgeRepository;

    public JudgeService(ReplyRepository replyRepository, BoardRepository boardRepository, ReplyJudgeRepository replyJudgeRepository, BoardJudgeRepository boardJudgeRepository) {
        this.replyRepository = replyRepository;
        this.boardRepository = boardRepository;
        this.replyJudgeRepository = replyJudgeRepository;
        this.boardJudgeRepository = boardJudgeRepository;
    }

    @Transactional
    public Mono<Integer> boardJudge(BoardJudge boardJudge) {
        log.debug("]-----] BoardService::boedJudge boardJudge [-----[ {}", boardJudge);
        Optional<Board> boardOptional = boardRepository.findById(boardJudge.getBoardId());
        if (!boardOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Board boardExists = boardOptional.get();
        int existsCount = boardJudgeRepository.countAllByMemberIdAndBoardId(boardJudge.getMemberId(), boardJudge.getBoardId());
        if (existsCount > 0) {
            return Mono.error(new AlreadyJudgeException());
        }
        boardJudgeRepository.save(boardJudge);
        int judgeCount = boardJudgeRepository.countAllByBoardId(boardJudge.getBoardId());
        boardExists.setJudgeCount(judgeCount);
        boardRepository.save(boardExists);

        return Mono.justOrEmpty(judgeCount);
    }

    @Transactional
    public Mono<Integer> replyJudge(ReplyJudge replyJudge) {
        log.debug("]-----] BoardService::boedJudge boardJudge [-----[ {}", replyJudge);
        Optional<Reply> replyOptional = replyRepository.findById(replyJudge.getReplyId());
        if (!replyOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Reply replyExists = replyOptional.get();
        int existsCount = replyJudgeRepository.countAllByMemberIdAndReplyId(replyJudge.getMemberId(), replyJudge.getReplyId());
        if (existsCount > 0) {
            return Mono.error(new AlreadyJudgeException());
        }
        replyJudgeRepository.save(replyJudge);
        int judgeCount = replyJudgeRepository.countAllByReplyId(replyJudge.getReplyId());
        replyExists.setJudgeCount(judgeCount);
        replyRepository.save(replyExists);

        return Mono.justOrEmpty(judgeCount);
    }
}
