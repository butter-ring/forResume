package com.coinnolja.web.api.reply;

import com.coinnolja.web.api.board.BoardRepository;
import com.coinnolja.web.api.board.constant.VoteType;
import com.coinnolja.web.api.board.exception.AlreadyVotedException;
import com.coinnolja.web.api.board.exception.BoardNotFoundException;
import com.coinnolja.web.api.board.mapper.BoardDTO;
import com.coinnolja.web.api.board.mapper.BoardList;
import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.board.view.VoteInfo;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.member.MemberExperienceService;
import com.coinnolja.web.api.member.constant.ExperienceType;
import com.coinnolja.web.api.reply.mapper.ReplyDTO;
import com.coinnolja.web.api.reply.mapper.ReplyList;
import com.coinnolja.web.api.reply.mapper.ReplyMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ReplyService {


    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    private final VoteReplyRepository voteReplyRepository;
    private final MemberExperienceService memberExperienceService;
    private final ReplyMapper replyMapper;


    public ReplyService(
            ReplyRepository replyRepository, BoardRepository boardRepository,
            VoteReplyRepository voteReplyRepository, MemberExperienceService memberExperienceService, ReplyMapper replyMapper) {
        this.replyRepository = replyRepository;
        this.boardRepository = boardRepository;

        this.voteReplyRepository = voteReplyRepository;
        this.memberExperienceService = memberExperienceService;
        this.replyMapper = replyMapper;
    }

    @Transactional
    public Mono<Reply> save(Reply reply, Long memberId) {

        Optional<Board> boardOptional = boardRepository.findById(reply.getBoardId());
        if (!boardOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Board board = boardOptional.get();
        reply.setMemberId(memberId);
        Reply replySaved = replyRepository.save(reply);
        if (replySaved.getParentId() > 0) {
            Reply replyParent = replyRepository.findById(replySaved.getParentId()).get();
            replyParent.setChildCount(replyRepository.countAllByParentIdAndActive(replyParent.getId(), 1));
            replyRepository.save(replyParent);
        } else {
            board.setCommentCount(replyRepository.countAllByBoardIdAndActive(board.getId(), 1));
            boardRepository.save(board);
        }
        return Mono.just(replySaved);
    }

    @Transactional
    public Mono<Reply> saveAsc(Reply reply, Long memberId) {
        log.debug("]-----] reply [-----[ {}", reply);
        Optional<Board> boardOptional = boardRepository.findById(reply.getBoardId());
        if (!boardOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Board board = boardOptional.get();
        reply.setMemberId(memberId);
//        Reply replySaved = replyRepository.save(reply);
        if (reply.getParentId() > 0) {
            Reply replyParent = replyRepository.findById(reply.getParentId()).get();
            reply.setDepCount(replyParent.getDepCount() + 1);
//            replyParent.setChildCount(replyRepository.countAllByParentIdAndActive(replyParent.getId(), 1));
//            replyRepository.save(replyParent);
        }
        Reply replySaved = replyRepository.save(reply);
        board.setCommentCount(replyRepository.countAllByBoardIdAndActive(board.getId(), 1));
        boardRepository.save(board);
        return Mono.just(replySaved);
    }


    @Transactional
    public Mono<VoteInfo> vote(VoteReply voteReply, InetSocketAddress ipAddress) {
        log.debug("]-----] BoardService::vote vote [-----[ {}", voteReply);
        Optional<Reply> replyOptional = replyRepository.findById(voteReply.getReplyId());
        if (!replyOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Reply replyExists = replyOptional.get();
        int existsCount = voteReplyRepository.countAllByMemberIdAndReplyId(voteReply.getMemberId(), voteReply.getReplyId());
        if (existsCount > 0) {
            return Mono.error(new AlreadyVotedException());
        }
        voteReplyRepository.save(voteReply);
        memberExperienceService.putExperience(replyExists.getMemberId(), ExperienceType.VOTE, ipAddress.getAddress().getHostAddress());
        VoteInfo voteInfo = new VoteInfo();
        voteInfo.setVoteType(voteReply.getVoteType());
        if (voteReply.getVoteType().equals(VoteType.UP)) {
            int upVoteCount = voteReplyRepository.countAllByReplyIdAndVoteType(voteReply.getReplyId(), VoteType.UP);
            replyExists.setUpVoteCount(upVoteCount);
            voteInfo.setVoteCount(upVoteCount);
        } else {
            int downVoteCount = voteReplyRepository.countAllByReplyIdAndVoteType(voteReply.getReplyId(), VoteType.DOWN);
            replyExists.setDownVoteCount(downVoteCount);
            voteInfo.setVoteCount(downVoteCount);
        }
        replyRepository.save(replyExists);

        return Mono.justOrEmpty(voteInfo);
    }


    public Mono<ReplyList> findAllAsc(Paging paging, Long boardId) {
        log.debug("]-----] findAll::paging [-----[ {}",paging);
        Optional<Board> boardOptional = boardRepository.findById(boardId);

        if (!boardOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Board board = boardOptional.get();
        ReplyList replyList = new ReplyList();
        int totalCount = replyMapper.findAllReplyCount(paging, boardId, 1);
        paging.setTotalCnt(totalCount);
        List<ReplyDTO> replyDTOList = replyMapper.findAllReply(paging, boardId, 1);
        log.debug("]-----] findAll::replyDTOList [-----[ {}",replyDTOList);
//        if (boardDTOList.size() > 0) {
        replyList.setContent(replyDTOList);
        replyList.setPageable(paging);
        replyList.setBoard(board);
        if (paging.getPageIndex() == 1) {
            replyList.setFirst(true);
        } else {
            replyList.setFirst(false);
        }
        if (paging.getPageIndex() == paging.getTotalPageUnit()) {
            replyList.setLast(true);
        } else {
            replyList.setLast(false);
        }
        return Mono.just(replyList);
//        } else {
//            return Mono.error(new BoardNotFoundException());
//        }

    }

}
