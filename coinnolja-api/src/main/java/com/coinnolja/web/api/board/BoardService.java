package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.constant.BoardType;
import com.coinnolja.web.api.board.constant.RewardType;
import com.coinnolja.web.api.board.constant.VoteType;
import com.coinnolja.web.api.board.exception.*;
import com.coinnolja.web.api.board.mapper.BoardDTO;
import com.coinnolja.web.api.board.mapper.BoardList;
import com.coinnolja.web.api.board.mapper.BoardMapper;
import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.board.model.BoardMaster;
import com.coinnolja.web.api.board.model.Vote;
import com.coinnolja.web.api.board.view.VoteInfo;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.mediacollection.MediaCollection;
import com.coinnolja.web.api.mediacollection.MediaCollectionRepository;
import com.coinnolja.web.api.member.MemberExperienceService;
import com.coinnolja.web.api.member.constant.ExperienceType;
import com.coinnolja.web.api.search.Search;
import com.coinnolja.web.api.search.SearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BoardService {

    private final BoardMapper boardMapper;
    private final VoteRepository voteRepository;


    private final BoardRepository boardRepository;
    private final BoardMasterRepository boardMasterRepository;
    private final SearchRepository searchRepository;

    private final MemberExperienceService memberExperienceService;
    private final MediaCollectionRepository mediaCollectionRepository;

    public BoardService(
            BoardMapper boardMapper
            , BoardMasterRepository boardMasterRepository
            , VoteRepository voteRepository
            , BoardRepository boardRepository,
            SearchRepository searchRepository, MemberExperienceService memberExperienceService, MediaCollectionRepository mediaCollectionRepository) {
        this.boardMapper = boardMapper;
        this.boardMasterRepository = boardMasterRepository;
        this.voteRepository = voteRepository;
        this.boardRepository = boardRepository;
        this.searchRepository = searchRepository;
        this.memberExperienceService = memberExperienceService;
        this.mediaCollectionRepository = mediaCollectionRepository;
    }

    public Mono<BoardList> findAll(Paging paging, Long boardMasterId) {
        log.debug("]-----] findAll::paging [-----[ {}", paging);
        Optional<BoardMaster> boardMasterOptional = boardMasterRepository.findById(boardMasterId);

        if (!boardMasterOptional.isPresent()) {
            return Mono.error(new BoardMasterNotFoundException());
        }
        BoardMaster boardMaster = boardMasterOptional.get();
        BoardList boardList = new BoardList();
        int totalCount = boardMapper.findAllBoardCount(paging, boardMasterId, 1);
        paging.setTotalCnt(totalCount);
        List<BoardDTO> boardDTOList = boardMapper.findAllBoard(paging, boardMasterId, 1);
//        if (boardDTOList.size() > 0) {
        boardList.setContent(boardDTOList);
        boardList.setPageable(paging);
        boardList.setBoardMaster(boardMaster);
        if (paging.getPageIndex() == 1) {
            boardList.setFirst(true);
        } else {
            boardList.setFirst(false);
        }
        if (paging.getPageIndex() == paging.getTotalPageUnit()) {
            boardList.setLast(true);
        } else {
            boardList.setLast(false);
        }
        return Mono.just(boardList);
//        } else {
//            return Mono.error(new BoardNotFoundException());
//        }

    }

    public Mono<BoardList> findAllWithMember(Paging paging, Long boardMasterId, Long memberId) {
        Optional<BoardMaster> boardMasterOptional = boardMasterRepository.findById(boardMasterId);

        if (!boardMasterOptional.isPresent()) {
            return Mono.error(new BoardMasterNotFoundException());
        }
        BoardMaster boardMaster = boardMasterOptional.get();
        BoardList boardList = new BoardList();
        int totalCount = boardMapper.findAllBoardCount(paging, boardMasterId, 1);
        paging.setTotalCnt(totalCount);
        List<BoardDTO> boardDTOList = boardMapper.findAllBoardWithMember(paging, boardMasterId, 1, memberId);
//        if (boardDTOList.size() > 0) {
        boardList.setContent(boardDTOList);
        boardList.setPageable(paging);
        boardList.setBoardMaster(boardMaster);
        if (paging.getPageIndex() == 1) {
            boardList.setFirst(true);
        } else {
            boardList.setFirst(false);
        }
        if (paging.getPageIndex() == paging.getTotalPageUnit()) {
            boardList.setLast(true);
        } else {
            boardList.setLast(false);
        }
        return Mono.just(boardList);


    }

    public Mono<BoardList> findTop(Long boardMasterId) {
        Optional<BoardMaster> boardMasterOptional = boardMasterRepository.findById(boardMasterId);

        if (!boardMasterOptional.isPresent()) {
            return Mono.error(new BoardMasterNotFoundException());
        }
        BoardMaster boardMaster = boardMasterOptional.get();
        BoardList boardList = new BoardList();

        List<BoardDTO> boardDTOList = boardMapper.findTopBoard(boardMasterId, 1);
//        if (boardDTOList.size() > 0) {
        boardList.setContent(boardDTOList);

        boardList.setBoardMaster(boardMaster);

        return Mono.just(boardList);
//        } else {
//            return Mono.error(new BoardNotFoundException());
//        }

    }

    @Transactional
    public Mono<VoteInfo> vote(Vote vote, InetSocketAddress ipAddress) {
        log.debug("]-----] BoardService::vote vote [-----[ {}", vote);
        Optional<Board> boardOptional = boardRepository.findById(vote.getBoardId());
        if (!boardOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Board boardExists = boardOptional.get();
        int existsCount = voteRepository.countAllByMemberIdAndBoardId(vote.getMemberId(), vote.getBoardId());
        if (existsCount > 0) {
            return Mono.error(new AlreadyVotedException());
        }
        voteRepository.save(vote);
        memberExperienceService.putExperience(boardExists.getMemberId(), ExperienceType.VOTE, ipAddress.getAddress().getHostAddress());
        VoteInfo voteInfo = new VoteInfo();
        voteInfo.setVoteType(vote.getVoteType());
        if (vote.getVoteType().equals(VoteType.UP)) {
            int upVoteCount = voteRepository.countAllByBoardIdAndVoteType(vote.getBoardId(), VoteType.UP);
            boardExists.setUpVoteCount(upVoteCount);
            voteInfo.setVoteCount(upVoteCount);
        } else {
            int downVoteCount = voteRepository.countAllByBoardIdAndVoteType(vote.getBoardId(), VoteType.DOWN);
            boardExists.setDownVoteCount(downVoteCount);
            voteInfo.setVoteCount(downVoteCount);
        }
        boardRepository.save(boardExists);

        return Mono.justOrEmpty(voteInfo);
    }

    @Transactional
    public Mono<Board> save(Board board, Long memberId, List<String> ipAddressWrap) {

        Optional<BoardMaster> boardMasterOptional = boardMasterRepository.findById(board.getBoardMasterId());
        if (!boardMasterOptional.isPresent()) {
            return Mono.error(new BoardMasterNotFoundException());
        }
        BoardMaster boardMaster = boardMasterOptional.get();
        return boardRoleValid(boardMaster).flatMap(bool -> {

            String ipAddress = "";
            if (ipAddressWrap.size() > 0) {
                ipAddress = ipAddressWrap.get(0);
            }

            log.debug("]-----] BoardService::save ipAddress [-----[ {}", ipAddress);
//            board.setIpAddress(ipAddress.getAddress().getHostAddress());
            board.setIpAddress(ipAddress);
            String content = board.getContent();
            String imgTag = "<img src=\"";
            int firstImgTag = StringUtils.indexOfIgnoreCase(content, imgTag);
            log.debug("]-----] BoardService::save content [-----[ {}", content);
            if (boardMaster.getBoardType().equals(BoardType.GALLERY)) {

                if (firstImgTag < 0 && board.getImageList().size() < 0) {
                    return Mono.error(new ImageNotFoundException());
                }
            }
            if (firstImgTag > 0) {
                int ix = firstImgTag + imgTag.length();
                String thumnailUrl = content.substring(ix, content.indexOf("\"", ix + 1));
                log.debug("]-----] BoardService::save thumnailUrl [-----[ {}", thumnailUrl);
                board.setThumnailUrl(thumnailUrl);
                board.setHasImage(true);
            }

            if (board.getImageList() != null) {
                if (board.getImageList().size() > 0) {
                    board.setHasImage(true);
                    List<MediaCollection> mediaCollections = new ArrayList<>();
                    log.debug("]-----] BoardService::save getImageList [-----[ {}", board.getImageList());
                    for (String image : board.getImageList()) {
                        log.debug("]-----] BoardService::save image [-----[ {}", image);
                        MediaCollection mediaCollection = new MediaCollection();
                        mediaCollection.setFullPath(image);

                        mediaCollection.setCollectionUuid(board.getCollectionUuid());
                        mediaCollections.add(mediaCollection);
                    }
                    board.setThumnailUrl(board.getImageList().get(0));
                    mediaCollectionRepository.saveAll(mediaCollections);
                }
            }

            board.setMemberId(memberId);
            if (RewardType.INFO.equals(boardMaster.getRewardType())) {
                memberExperienceService.putExperience(memberId, ExperienceType.WRITE_INFO, ipAddress);
            } else {
                memberExperienceService.putExperience(memberId, ExperienceType.WRITE, ipAddress);
            }

            return Mono.just(boardRepository.save(board));
        });

    }

    @Transactional
    public Mono<Board> put(Board board, Long memberId, Long boardId) {
        log.debug("]-----] BoardService::put call [-----[ {}", board);
        Optional<Board> boardOptional = boardRepository.findById(boardId);
        if (!boardOptional.isPresent()) {
            return Mono.error(new BoardNotFoundException());
        }
        Board boardExists = boardOptional.get();

        Optional<BoardMaster> boardMasterOptional = boardMasterRepository.findById(boardExists.getBoardMasterId());
        if (!boardMasterOptional.isPresent()) {
            return Mono.error(new BoardMasterNotFoundException());
        }
        BoardMaster boardMaster = boardMasterOptional.get();
        return boardRoleValid(boardMaster).flatMap(bool -> {
            if (!boardExists.getMemberId().equals(memberId)) {
                return Mono.error(new AuthenticationFailedException());
            }
            boardExists.setContent(board.getContent());
            boardExists.setTitle(board.getTitle());
            boardExists.setTitleHead(board.getTitleHead());
            boardExists.setUpdatedAt(LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli());

            String content = board.getContent();
            log.debug("]-----] BoardService::put content [-----[ {}", content);
            String imgTag = "<img src=\"";
            int firstImgTag = StringUtils.indexOfIgnoreCase(content, imgTag);
            if (boardMaster.getBoardType().equals(BoardType.GALLERY)) {

                if (firstImgTag < 0 && board.getImageList().size() < 0) {
                    return Mono.error(new ImageNotFoundException());
                }

            }
            if (firstImgTag > 0) {
                int ix = firstImgTag + imgTag.length();
                String thumnailUrl = content.substring(ix, content.indexOf("\"", ix + 1));
                log.debug("]-----] BoardService::save thumnailUrl [-----[ {}", thumnailUrl);
                boardExists.setThumnailUrl(thumnailUrl);
                boardExists.setHasImage(true);
            }

            if (board.getImageList() != null) {
                if (board.getImageList().size() > 0) {
                    board.setHasImage(true);
                    List<MediaCollection> mediaCollections = new ArrayList<>();
                    for (String image : board.getImageList()) {
                        log.debug("]-----] BoardService::save image [-----[ {}", image);
                        MediaCollection mediaCollection = new MediaCollection();
                        mediaCollection.setFullPath(image);
                        mediaCollection.setCollectionUuid(boardExists.getCollectionUuid());
                        mediaCollections.add(mediaCollection);
                    }
                    board.setThumnailUrl(board.getImageList().get(0));
                    mediaCollectionRepository.deleteAllByCollectionUuid(boardExists.getCollectionUuid());
                    mediaCollectionRepository.saveAll(mediaCollections);
                }
            }
            return Mono.just(boardRepository.save(boardExists));
        });

    }


    public Mono<BoardList> findAllForSearch(Paging paging) {

        log.info("]-----] BoardService::findAllForSearch call [-----[ ");
        BoardList boardList = new BoardList();
        int totalCount = boardMapper.findAllBoardForSearchCount(paging, 1);
        paging.setTotalCnt(totalCount);
        List<BoardDTO> boardDTOList = boardMapper.findAllBoardForSearch(paging, 1);

        if(!boardDTOList.isEmpty() && (paging.getSearchVal().trim().length() > 0) ){
            Search search = new Search();
            search.setSearchWord(paging.getSearchVal());
            searchRepository.save(search);
        }
        boardList.setContent(boardDTOList);
        boardList.setPageable(paging);
        if (paging.getPageIndex() == 1) {
            boardList.setFirst(true);
        } else {
            boardList.setFirst(false);
        }
        if (paging.getPageIndex() == paging.getTotalPageUnit()) {
            boardList.setLast(true);
        } else {
            boardList.setLast(false);
        }
        return Mono.just(boardList);
    }

    public Mono<Boolean> boardRoleValid(BoardMaster boardMaster) {
        Mono<SecurityContext> context = ReactiveSecurityContextHolder.getContext();
        return context.map(SecurityContext::getAuthentication)
                .flatMap(authentication -> {
                    /** 권한체크 start */
                    if (StringUtils.isNotBlank(boardMaster.getWriteRoles())) {
                        String[] writeRoles = StringUtils.split(boardMaster.getWriteRoles(), "|");
                        int matchCount = 0;
                        if (writeRoles.length > 0) {
                            for (String boardRole : writeRoles) {
                                for (GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
                                    log.debug("]-----] BoardService::save grantedAuthority [-----[ {}", grantedAuthority.getAuthority());
                                    if (boardRole.equals(grantedAuthority.getAuthority())) {
                                        matchCount += 1;
                                    }
                                }
                            }
                        }
                        log.debug("]-----] BoardService::save matchCount [-----[ {}", matchCount);
                        if (matchCount < 1) {
                            return Mono.error(new AuthenticationFailedException());
                        }

                    }
                    /** 권한체크 end */
                    return Mono.just(true);
                });

    }


}
