package com.coinnolja.web.api.member;

import com.amazonaws.services.s3.transfer.TransferManager;
import com.coinnolja.web.api.auth.*;
import com.coinnolja.web.api.auth.constant.RoleEnum;
import com.coinnolja.web.api.board.BoardRepository;
import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.common.security.jwt.JWTTokenService;
import com.coinnolja.web.api.member.constant.*;
import com.coinnolja.web.api.member.exception.PasswordNotValidException;
import com.coinnolja.web.api.member.exception.UserNameIsAlreadyExistsException;
import com.coinnolja.web.api.member.model.*;
import com.coinnolja.web.api.member.view.*;
import com.coinnolja.web.api.reply.ReplyRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.FormFieldPart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.InetSocketAddress;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Slf4j
@Component
public class MemberHandler {


    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final AuthRoleRepository authRoleRepository;
    private final MemberDeviceRepository memberDeviceRepository;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final MemberHeartRepository memberHeartRepository;
    private final MemberPartnershipRepository memberPartnershipRepository;
    private final MemberValidation memberValidation;
    private final MemberPointRepository memberPointRepository;
    private final MemberNoteRepository memberNoteRepository;
    private final MemberCoinScheduleRepository memberCoinScheduleRepository;
    private final BoardRepository boardRepository;
    private final MemberValidHistoryRepository memberValidHistoryRepository;
    private final AuthRepository authRepository;
    private final TransferManager transferManager;
    private final MemberQnaRepository memberQnaRepository;
    private final MemberExperienceService memberExperienceService;
    private final ReplyRepository replyRepository;
    private final MemberCoinIndexExchangeRepository memberCoinIndexExchangeRepository;
    private final MemberCoinIndexTokenRepository memberCoinIndexTokenRepository;


    public MemberHandler(
            MemberRepository memberRepository
            , RoleRepository roleRepository
            , AuthRoleRepository authRoleRepository
            , MemberDeviceRepository memberDeviceRepository
            , MemberService memberService, PasswordEncoder passwordEncoder
            , MemberHeartRepository memberHeartRepository
            , MemberValidation memberValidation
            , MemberPointRepository memberPointRepository
            , BoardRepository boardRepository
            , MemberNoteRepository memberNoteRepository
            , MemberCoinScheduleRepository memberCoinScheduleRepository
            , MemberPartnershipRepository memberPartnershipRepository
            , MemberValidHistoryRepository memberValidHistoryRepository
            , AuthRepository authRepository
            , TransferManager transferManager
            , MemberQnaRepository memberQnaRepository
            , MemberExperienceService memberExperienceService
            , ReplyRepository replyRepository
            , MemberCoinIndexExchangeRepository memberCoinIndexExchangeRepository
            , MemberCoinIndexTokenRepository memberCoinIndexTokenRepository
    ) {

        this.memberRepository = memberRepository;
        this.roleRepository = roleRepository;
        this.authRoleRepository = authRoleRepository;
        this.memberDeviceRepository = memberDeviceRepository;
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.memberValidHistoryRepository = memberValidHistoryRepository;
        this.memberHeartRepository = memberHeartRepository;
        this.memberValidation = memberValidation;
        this.memberNoteRepository = memberNoteRepository;
        this.memberPointRepository = memberPointRepository;
        this.memberPartnershipRepository = memberPartnershipRepository;
        this.memberCoinScheduleRepository = memberCoinScheduleRepository;
        this.boardRepository = boardRepository;
        this.authRepository = authRepository;
        this.transferManager = transferManager;
        this.memberQnaRepository = memberQnaRepository;
        this.memberExperienceService = memberExperienceService;
        this.replyRepository = replyRepository;
        this.memberCoinIndexExchangeRepository = memberCoinIndexExchangeRepository;
        this.memberCoinIndexTokenRepository = memberCoinIndexTokenRepository;
    }

    @Value("${path.file.tmp}")
    private String tempFilePath;

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Value("${aws.bucket.url}")
    private String bucketUrl;


    /**
     * POST a MemberSignup
     */
    public Mono<ServerResponse> signup(ServerRequest request) {
        log.info("]-----] MemberHandler::signup call [-----[ ");
        Mono<MemberSignup> memberSignUpMono = request.bodyToMono(MemberSignup.class);
        InetSocketAddress ipAddress = request.remoteAddress().get();
        return memberSignUpMono
                .flatMap(memberValidation::validateMemberSignup)
                .flatMap(memberSignup -> {
                    log.debug("]-----] MemberHandler::signup.memberSignup [-----[ {}", memberSignup);
                    Member member = new Member();
                    member.setUsername(memberSignup.getUsername());
                    String encryptPassword = passwordEncoder.encode(memberSignup.getPassword());
                    member.setPassword(encryptPassword);
                    member.setGender(memberSignup.getGender());
                    member.setBirthday(memberSignup.getBirthday());
                    member.setNickName(memberSignup.getNickName());
                    member.setEmail(memberSignup.getEmail());
                    member.setRealName(memberSignup.getRealName());
                    member.setStatus(MemberStatus.ACTIVE);

                    return Mono.just(memberRepository.save(member)).doOnSuccess(m -> {
                        Role role = roleRepository.findByRole(RoleEnum.GUEST.getCode());
                        log.debug("]-----] MemberHandler::signup.role [-----[ {}", role);
                        AuthRole authRole = new AuthRole();
                        authRole.setAuthId(member.getId());
                        authRole.setRoleId(role.getId());
                        authRoleRepository.save(authRole);
                        memberExperienceService.putExperience(member.getId(), ExperienceType.SIGNUP, ipAddress.getAddress().getHostAddress());
                    }).switchIfEmpty(Mono.empty());

                })
                .flatMap(member -> {
                    MemberValidationHistory memberValidationHistory = new MemberValidationHistory();
                    memberValidationHistory.setMemberId(member.getId());
                    String validString = RandomStringUtils.randomAlphabetic(20);
                    memberValidationHistory.setValidString(validString);
                    memberValidationHistory.setValidType(MemberValidType.EMAIL);
                    memberValidationHistory.setEmail(member.getEmail());
                    memberValidHistoryRepository.save(memberValidationHistory);
                    return Mono.just(memberValidationHistory);
                })
                .flatMap(memberValidation::validateEmailSend)
                .flatMap(history -> {
                    memberRepository.updateVlidStatus(history.getMemberId(), ValidStatus.DOING.getCode());
                    return Mono.just(history.getCreatedAt());
                })
                .flatMap(member -> ServerResponse.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(member)))
                .switchIfEmpty(badRequest().build());

    }


    /**
     * POST a MemberSignupSns
     */
    public Mono<ServerResponse> signupSns(ServerRequest request) {
        log.info("]-----] MemberHandler::signupSns call [-----[ ");

        return request.bodyToMono(MemberSignup.class)
                .flatMap(memberService::signupSns)
                .flatMap(result -> ok().body(fromObject(result)))
                .switchIfEmpty(notFound().build());

    }


    /**
     * GET a Member
     */
    //로그인 된 회원의 id  값 가져오기]
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findById(ServerRequest request) {
        log.info("]-----] MemberHandler::findById call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        System.out.println("확인!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + id);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    Member member = memberRepository.findById(id).get();
                    return Mono.justOrEmpty(member);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    }


    //@PreAuthorize -> role을 확인하여 권한이 있는 사용자만 메소드에 접근 가능하게 만든다.
    //principal() -> Get the authenticated user for the request, if any.
    //회원의 정보를 memberInfo view를 사용하여 가져온다.
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myInfo(ServerRequest request) {
        MemberInfo memberInfo = new MemberInfo();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member -> {

                    memberInfo.setMember(member);
                    return Mono.just(memberInfo);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());

    }

    // 마이페이지 정보 불러오기 memberSimple에 담는다.
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myPage(ServerRequest request) {
        log.info("]-----] MemberHandler::myPage call [-----[ ");
        MemberSimple memberSimple = new MemberSimple();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member -> {
                    memberSimple.setValidStatus(member.getValidStatus());
                    memberSimple.setUsername(member.getUsername());
                    memberSimple.setStatus(member.getStatus());
                    memberSimple.setProfileImageUrl(member.getProfileImageUrl());
                    memberSimple.setProfileImageSmallUrl(member.getProfileImageSmallUrl());
                    memberSimple.setMemberPoint(member.getMemberPoint());
                    memberSimple.setMemberExperience(member.getMemberExperience());
                    memberSimple.setMemberLevel(member.getMemberLevel());
                    memberSimple.setNickName(member.getNickName());
                    memberSimple.setLastSigninAt(member.getLastSigninAt());
                    memberSimple.setCreatedAt(member.getCreatedAt());
                    memberSimple.setGender(member.getGender());
                    memberSimple.setBirthday(member.getBirthday());
                    memberSimple.setRealName(member.getRealName());
                    memberSimple.setAdmin(member.isAdmin());
                    return Mono.just(memberSimple);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    } // myPage end

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findMemberInfo(ServerRequest request) {
        log.info("]-----] MemberHandler::findMemberInfo call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        return request.principal()
                .flatMap(memberId -> {
                    Member member = memberRepository.findById(id).get();
                    return Mono.justOrEmpty(member);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findMemberBoardList(ServerRequest request) {
        log.info("]-----] MemberHandler::findMemberBoardList call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 0;
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;
        // Sort sort = new Sort(Sort.Direction.DESC, "createdAt");
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId ->
                        Mono.just(boardRepository.findAllByMemberIdAndActiveOrderByCreatedAtDesc(PageRequest.of(page, pageSize), id, 1))
                ).flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findMemberReplyList(ServerRequest request) {
        log.info("]-----] MemberHandler::findMemberBoardList call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));

        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 0;
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId ->
                        Mono.just(replyRepository.findAllByMemberIdAndActiveOrderByCreatedAtDesc(PageRequest.of(page, pageSize), id, 1)))
                .flatMap(replies -> ok().body(fromObject(replies)))
                .switchIfEmpty(notFound().build());
    }


    //회원 작성한 게시글 목록을 마이페이지에서 확인
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myBoardList(ServerRequest request) {
        log.info("]-----] MemberHandler::myBoardList call [-----[ ");

        return request.principal()
                //memberId를 찾고
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))

                //찾은 memberId와 active 상태로 상위 5개의 게시글을 가져온다.
                .flatMap(memberId ->
                        Mono.just(boardRepository.findTop5ByMemberIdAndActive(
                                memberId, 1)))
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());
    } // myBoardList End

    //회원 작성한 댓글 목록을 마이페이지에서 확인
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myReplyList(ServerRequest request) {
        log.info("]-----] MemberHandler::myReplyList call [-----[ ");

        return request.principal()
                //memberId를 찾고
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))

                //찾은 memberId와 active 상태로 상위 5개의 댓글을 가져온다.
                .flatMap(memberId ->
                        Mono.just(replyRepository.findTop5ByMemberIdAndActiveOrderByCreatedAtDesc(
                                memberId, 1)))
                .flatMap(board -> ok().body(fromObject(board)))
                .switchIfEmpty(notFound().build());
    } // myReplyList End

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myQnAList(ServerRequest request) {
        log.info("]-----] MemberHandler::myQnAList call [-----[ ");

        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 0;
        System.out.println("pageCheck-------------------------" + page);
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;
        Sort sort = new Sort(Sort.Direction.DESC, "createdAt");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                            Member member;
                            log.debug("]-----] memberHandler::myQnAList [-----[ {}", memberId);
                            member = memberRepository.findById(memberId).get();
                            if(member.isAdmin()) {
                                return Mono.just(memberQnaRepository.findAll(PageRequest.of(page,pageSize,sort)));
                            }
                            return Mono.just(memberQnaRepository.findAllByMemberId(PageRequest.of(page, pageSize, sort), memberId));
                        }
                )
                .flatMap(memberQna -> ok().body(fromObject(memberQna)))
                .switchIfEmpty(notFound().build());
    } // myQnAList End

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> qnaNotice(ServerRequest request) {
        log.info("]-----] MemberHandler::qnaNotice call [-----[ ");

        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 0;
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;
        Sort sort = new Sort(Sort.Direction.DESC, "createdAt");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                            log.debug("]-----] memberHandler::myQnAList [-----[ {}", memberId);
                            return Mono.just(boardRepository.findAllByBoardMasterIdAndActive(PageRequest.of(page, pageSize, sort), 63L, 1));
                        }
                )
                .flatMap(qnaNotice -> ok().body(fromObject(qnaNotice)))
                .switchIfEmpty(notFound().build());
    } // myQnAList End


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myQnaSave(ServerRequest request) {
        log.info("]-----] MemberHandler:: myQnaWrite call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> request.bodyToMono(MemberQna.class)
                        .flatMap(memberQna -> {
                            memberQna.setMemberId(memberId);
                            log.info("]-----] MemberHandler:: memberQna {} [-----[ ", memberQna);
                            return Mono.just(memberQnaRepository.save(memberQna));
                        })
                ).flatMap(memberQna -> ok().body(fromObject(memberQna)))
                .switchIfEmpty(notFound().build());

    } // myQnaSave End

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> myQnaAnswer(ServerRequest request) {
        log.info("]-----] MemberHandler:: myQnaAnswer call [-----[ ");

        Mono<MemberQna> memberQnaMono = request.bodyToMono(MemberQna.class);

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(qnaId -> memberQnaMono.flatMap(memberAnswer -> {
                    log.info("]-----] MemberHandler:: memberAnswer {} [-----[ ", memberAnswer);
                    Long id = memberAnswer.getId();
                    MemberQna memberQna;
                    memberQna = memberQnaRepository.findById(id).get();
                    memberQna.setAnswer(memberAnswer.getAnswer());
                    memberQna.setHasAnswer(1);
                    return Mono.just(memberQnaRepository.save(memberQna));
                }))
                .flatMap(memberQna -> ok().body(fromObject(memberQna)))
                .switchIfEmpty(notFound().build());

    } // myQnaAnswer End

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findMyQnaDetail(ServerRequest request) {
        log.info("]-----] memberHandler::findMyQnaDetail call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberQnaRepository.findById(id).get()))
                .flatMap(myQna -> ok().body(fromObject(myQna)))
                .switchIfEmpty(notFound().build());
    } // findMyQnaDetail End


    //회원이 받은 쪽지 목록을 마이페이지에서 확인
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> noteList(ServerRequest request) {
        log.info("]-----] MemberHandler::NoteList call [-----[ ");

        ///////////////////
        //Long boardMasterId = request.queryParam("boardMasterId").isPresent() ? Long.parseLong(request.queryParam("boardMasterId").get()) : 1;
        Paging paging = new Paging();
        //Sort sort = new Sort(Sort.Direction.DESC, "createdAt");

        log.info("]-----] MemberHandler::request [-----[   {}", request);

        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) - 1 : 1;
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;
        Sort sort = new Sort(Sort.Direction.DESC, "sendAt");

        paging.setPageIndex(page);
        paging.setPageSize(pageSize);

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId ->
                        Mono.just(memberNoteRepository.findAllByReceiverIdAndRecvDelOrderBySendAtDesc(PageRequest.of(page, pageSize, sort), memberId, 0)))
                .flatMap(memberNote -> ok().body(fromObject(memberNote)))
                .switchIfEmpty(notFound().build());

        //Integer pageSize = request.queryParam("pageSize").isPresent() ? Integer.parseInt(request.queryParam("pageSize").get()) : 5;
        //Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) : 1;

//        return Mono.just(sampleRepository.findAll(PageRequest.of(page, size)))
//                .flatMap(samples -> ok().body(fromObject(samples)))
//                .switchIfEmpty(notFound().build());

        /////////////////////
//        return request.principal()
//                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
//                .flatMap(memberId ->
//                        Mono.just(memberNoteRepository.findAllByReceiverIdAndRecvDel(memberId, 0)))
//                .flatMap(memberNote -> ok().body(fromObject(memberNote)))
//                .switchIfEmpty(notFound().build());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public Mono<ServerResponse> post(ServerRequest request) {
        Mono<Member> memberMono = request.bodyToMono(Member.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(memberExists -> memberMono.flatMap(member -> {
                    if (member.getNickName() != null) {
                        memberExists.setNickName(member.getNickName());
                    }


                    return Mono.just(memberRepository.save(memberExists));
                }))
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());

    }


    public Mono<ServerResponse> signupDup(ServerRequest request) {
        log.info("]-----] MemberHandler::signup call [-----[ ");

        return request.bodyToMono(MemberSignup.class)
                .flatMap(memberSignup -> Mono.just(memberRepository.countAllByNickNameAndActive(memberSignup.getNickName(), 1)))
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());

    }

    // 출석체크 첫 화면 데이터
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> dayget(ServerRequest request) {
        log.info("]-----] MemberHandler::dayget call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberPointRepository.findAllByMemberIdAndActive(memberId, 1)))
                .flatMap(memberPoint -> ok().body(fromObject(memberPoint)))
                .switchIfEmpty(notFound().build());
    }

    /**
     * 출석체크 데이터 저장하기
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> attendCheck(ServerRequest request) {
        log.info("]-----] MemberHandler::attendCheck call [-----[ ");

        Mono<MemberPoint> memberPointMono = request.bodyToMono(MemberPoint.class);
        InetSocketAddress ipAddress = request.remoteAddress().get();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberPointMono.flatMap(memberPoint -> {
                    // 아이디로 조회를 해서 현재 날짜 출석 데이터가 있다면 저장하지 않음.
                    if ((memberPointRepository.countByMemberId(memberId)) > 0) {
                        log.info("]-----] CountByMemberId is not empty [-----[ ");
                    } else {
                        // 출석메모가 비어있다면 기본 출석 메세지 등록
                        if (memberPoint.getMemo().equals("")) {
                            log.info("]-----] attend memo is empty [-----[ ");
                            memberPoint.setMemo("출석체크 합니다~^^");
                        }
                        memberPoint.setMemberId(memberId);
                        memberPoint.setPoint(5);
                        memberPoint.setPointGetType(PointGetType.ATTENDANCE);
                        memberExperienceService.putExperience(memberId, ExperienceType.ATTENDANCE, ipAddress.getAddress().getHostAddress());
                        return Mono.just(memberPointRepository.save(memberPoint));
                    }
                    // 출석한 데이터가 있다면 나감
                    return Mono.justOrEmpty(1);
                }))
                .flatMap(memberPoint -> ok().body(fromObject(memberPoint)))
                .switchIfEmpty(notFound().build());

        //지우지 말것.
        //        return memberPointMono   //request.bodyToMono(MemberPoint.class)
//                .flatMap(memberPoint -> Mono.just(memberPointRepository.save(memberPoint)))
//                .flatMap(memberPoint -> ok().body(fromObject(memberPoint)))
//                .switchIfEmpty(notFound().build());

    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> attendList(ServerRequest request) {
        log.info("]-----] MemberHandler::attendList call [-----[ ");

        return request.principal()
                .flatMap(memberPoint -> Mono.just(memberPointRepository.findAllOrderByCreatedAtAsc()))
                .flatMap(memberPoint -> ok().body(fromObject(memberPoint)))
                .switchIfEmpty(notFound().build());


    }

    /**
     * POST a MediaCollecton
     */
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> profileImgUploadSingle(ServerRequest request) {
        log.info("]-----] memberHandler::profileImgUploadSingle call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member ->
                                request.body(BodyExtractors.toMultipartData())
                                        .flatMap(partMap -> {
                                            log.debug("]-----] memberHandler::profileImgUploadSingle partMap [-----[ {}", partMap);
                                            Part part = partMap.getFirst("media");
                                            String imageUrl = "";
                                            log.debug("]-----] memberHandler::profileImgUploadSingle part [-----[ {}", part);
                                            log.debug("]-----] memberHandler::profileImgUploadSingle part [-----[ {}", part.name());
                                            log.debug("]-----] memberHandler::profileImgUploadSingle part [-----[ {}", part.content());
                                            log.debug("]-----] memberHandler::profileImgUploadSingle [-----[ {}", part.getClass());
                                            if (part instanceof FilePart) {
                                                try {

                                                    FilePart filePart = ((FilePart) part);
                                                    log.debug("]-----] memberHandler::profileImgUploadSingle filename [-----[ {}", filePart.filename());

                                                    String originalFileName = filePart.filename();

                                                    String imageExt = StringUtils.defaultIfBlank(getFileExtension(originalFileName), "");
                                                    String path = "member/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                                                    String collectionUuid = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + RandomStringUtils.randomAlphabetic(24);
                                                    String modifyName = collectionUuid + "." + imageExt;

                                                    File tempFile = new File(tempFilePath + modifyName);
                                                    log.debug("]-----] memberHandler::profileImgUploadSingle tempFile [-----[ {}", tempFile);
                                                    filePart.transferTo(tempFile);

                                                    List<File> fileList = new ArrayList<>();
                                                    BufferedImage srcImg = ImageIO.read(tempFile);
                                                    String resultName = "re-" + modifyName;
//                                                    Upload xfer = null;
                                                    if (srcImg.getWidth() > 1024) {
                                                        BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_WIDTH, 1024);
                                                        File resultFile = new File(tempFilePath + resultName);
                                                        ImageIO.write(destImg, imageExt.toLowerCase(), resultFile);
                                                        fileList.add(resultFile);
                                                        imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + resultName;
//                                                        transferManager.upload(bucketName, path, resultFile);

                                                    } else {
                                                        fileList.add(tempFile);
                                                        imageUrl = bucketUrl + "/" + bucketName + "/" + path + "/" + modifyName;
//                                                        transferManager.upload(bucketName, path, tempFile);
                                                    }

                                                    transferManager.uploadFileList(bucketName, path, new File(tempFilePath), fileList).waitForCompletion();

                                                } catch (Exception e) {
                                                    return Mono.error(e);
                                                }
                                            }
                                            member.setProfileImageUrl(imageUrl);
                                            log.debug("]-----] memberHandler::profileImgUploadSingle setProfileImageUrl [-----[ {}", member);
                                            memberRepository.save(member);
                                            return Mono.just(imageUrl);
                                        })

                )
                .flatMap(url -> ok().body(fromObject(url)))
                .switchIfEmpty(notFound().build());
    } // profileImgUploadSingle end


    // 내 정보 변경
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> updateMyInfo(ServerRequest request) {
        log.info("]-----] MemberHandler::updateMyInfo call [-----[ ");
        Mono<MemberUpdate> memberUpdateMono = request.bodyToMono(MemberUpdate.class);
        // MemberUpdate memberUpdate =
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberUpdateMono.flatMap(memberUpdate -> {
                    log.info("]-----] memberHandler::updateMyInfo [-----[ {}", memberUpdate);
                    Member member;
                    member = memberRepository.findById(memberId).get();
                    member.setGender(memberUpdate.getGender());
                    member.setBirthday(memberUpdate.getBirthday());
                    member.setRealName(memberUpdate.getRealName());
                    member.setNickName(memberUpdate.getNickName());
                    log.info("]-----] memberHandler::member [-----[ {}", memberUpdate);
                    return Mono.just(memberRepository.save(member));
                }))
                .flatMap(memberUpdate -> ok().body(fromObject(memberUpdate)))
                .switchIfEmpty(notFound().build());
    } // updateMyInfo End

    // 비밀번호 비교
    public Mono<ServerResponse> checkPassword(ServerRequest request) {
        log.info("]-----] MemberHandler::checkPassword call [-----[ ");
        Mono<MemberUpdate> memberUpdateMono = request.bodyToMono(MemberUpdate.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberUpdateMono.flatMap(memberUpdate -> {
                    Member member;
                    member = memberRepository.findById(memberId).get();
                    Boolean passwordMatches = passwordEncoder.matches(memberUpdate.getPassword(), member.getPassword());
                    return Mono.just(passwordMatches);
                })).flatMap(memberUpdate -> ok().body(fromObject(memberUpdate)))
                .switchIfEmpty(notFound().build());
    } // checkPassword End


    // 비밀번호 변경
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> updatePassword(ServerRequest request) {
        log.info("]-----] MemberHandler::updatePassword call [-----[ ");
        Mono<MemberUpdate> memberUpdateMono = request.bodyToMono(MemberUpdate.class);

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberUpdateMono.flatMap(memberUpdate -> {
                    Member member;
                    member = memberRepository.findById(memberId).get();
                    Boolean passwordMatches = passwordEncoder.matches(memberUpdate.getCurrentPassword(), member.getPassword());
                    if (passwordMatches) {
                        String encryptPassword = passwordEncoder.encode(memberUpdate.getPassword());
                        member.setPassword(encryptPassword);
                        return Mono.just(memberRepository.save(member));
                    }
                    return Mono.error(new PasswordNotValidException());
                }))
                .flatMap(memberUpdate -> ok().body(fromObject(memberUpdate)))
                .switchIfEmpty(notFound().build());
    } // checkPassword End


    /* 쪽지
     */
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> note(ServerRequest request) {
        log.info("]-----] MemberNote:: call [-----[ ");

        Mono<MemberNote> memberNoteMono = request.bodyToMono(MemberNote.class);

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberNoteMono.flatMap(memberNote -> {

                    //아이디가 있을때 = 전송
                    if (memberRepository.findByUsername(memberNote.getReceiverUsername()) != null) {
                        // 받는이 username으로 검색한 아이디를 receiverId에 저장.
                        memberNote.setReceiverId(memberRepository.findByUsername(memberNote.getReceiverUsername()).getId());
                        memberNote.setSenderId(memberId);
                        // findbyid 에서 id로 검색해서 username을 가져와서 senderusername에 넣어줌.
                        memberNote.setSenderUsername(memberRepository.findById(memberId).get().getUsername());
                        return Mono.just(memberNoteRepository.save(memberNote));
                    } else { //없을때 = 에러메세지
                        return Mono.error(new UserNameIsAlreadyExistsException());
                    }
                }))
                .flatMap(memberNote -> ok().body(fromObject(memberNote)))
                .switchIfEmpty(notFound().build());
    }

    // 쪽지 삭제
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> notedel(ServerRequest request) {
        log.info("]-----] MemberHandler::notedel call [-----[ ");
        Mono<MemberNote> memberNoteMono = request.bodyToMono(MemberNote.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberNoteMono.flatMap(MemberNoteData -> {
                    MemberNote memberNote;
                    memberNote = memberNoteRepository.findBySenderIdAndSendAt(MemberNoteData.getSenderId(), MemberNoteData.getSendAt());
                    memberNote.setRecvDel(1);
                    return Mono.just(memberNoteRepository.save(memberNote));

                }))
                .flatMap(MemberNote -> ok().body(fromObject(MemberNote)))
                .switchIfEmpty(notFound().build());
    }

    public Mono<ServerResponse> validemail(ServerRequest request) {
        return request.principal()
                .map(p -> Long.parseLong(p.getName()))
                .flatMap(userId -> Mono.just(memberRepository.findById(userId).get()))
                .flatMap(user -> memberValidation.validateEmailRequest(user, request.bodyToMono(MemberValidationHistory.class)))
                .flatMap(history -> {
                    memberRepository.updateVlidStatus(history.getMemberId(), ValidStatus.DONE.getCode());
                    Role role = roleRepository.findByRole(RoleEnum.USER.getCode());
                    log.debug("]-----] MemberHandler::signup.role [-----[ {}", role);
                    AuthRole authRole = new AuthRole();
                    authRole.setAuthId(history.getMemberId());
                    authRole.setRoleId(role.getId());
                    authRoleRepository.save(authRole);
                    Auth auth = authRepository.findByIdAndActive(history.getMemberId(), 1);
                    return Mono.just(String.join(" ", "Bearer", JWTTokenService.generateToken(auth.getUsername(), auth.getAuthorities(), auth)));
                })
                .flatMap(user -> ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(user)))
                .switchIfEmpty(notFound().build());
    }


    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findProfileImageUrlById(ServerRequest request) {
        log.info("]-----] memberHandler::getProfileImage call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member -> Mono.justOrEmpty(member.getProfileImageUrl()))
                .flatMap(member -> ok().body(fromObject(member))
                )
                .switchIfEmpty(notFound().build());

    }

    private static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return null;
        }
    }

    public Mono<ServerResponse> findMyInfo(ServerRequest request) {
        return request.bodyToMono(MemberSignup.class)
                .flatMap(memberSignup -> memberService.findMyInfo(memberSignup))
                .flatMap(user -> ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(user)))
                .switchIfEmpty(notFound().build());
    }

    // 제휴문의
    public Mono<ServerResponse> partnership(ServerRequest request) {
        log.info("]-----] MemberHandler::partnership call [-----[ ");

        Mono<MemberPartnership> memberPartnershipMono = request.bodyToMono(MemberPartnership.class);

        return request.principal()
                .flatMap(memberId -> memberPartnershipMono.flatMap(memberPoint -> {

                    return Mono.just(memberPartnershipRepository.save(memberPoint));

                }))
                .flatMap(memberPoint -> ok().body(fromObject(memberPoint)))
                .switchIfEmpty(notFound().build());
    }

    // 코인 일정 달력표 가져오기
    // @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> coinschedule(ServerRequest request) {
        log.info("]-----] MemberHandler::coinschedule call [-----[ ");

        return Mono.just(memberCoinScheduleRepository.findAllByActive(1))
                .flatMap(memberCoinSchedule -> ok().body(fromObject(memberCoinSchedule)))
                .switchIfEmpty(notFound().build());

    }



    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> coinIndex(ServerRequest request) {
        Mono<MemberCoinIndex> memberCoinIndexMono = request.bodyToMono(MemberCoinIndex.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    return request.body(BodyExtractors.toMultipartData())
                            .flatMap(partMap -> {
//                                log.debug("]-----] MemberHandler::partMap [-----[ {}", partMap);
                                List<Part> exchangeCodeParts = partMap.get("exchangeCode");
                                List<Part> selectedParts = partMap.get("selected");
//                                log.debug("]-----] MemberHandler::exchangeCodeParts [-----[ {}", exchangeCodeParts);
//                                log.debug("]-----] MemberHandler::selectedParts [-----[ {}", selectedParts);
                                List<MemberCoinIndexExchange> memberCoinIndexExchanges = new ArrayList<>();
                                for (int i = 0; i < 13; i++) {
                                    MemberCoinIndexExchange memberCoinIndexExchange = new MemberCoinIndexExchange();
                                    memberCoinIndexExchange.setMemberId(memberId);
                                    Part part = partMap.getFirst("exchangeCode[" + i + "]");
                                    String exchangeCode = ((FormFieldPart) part).value();
                                    memberCoinIndexExchange.setExchangeCode(exchangeCode);
                                    Part partName = partMap.getFirst("exchangeName[" + i + "]");
                                    String exchangeName = ((FormFieldPart) partName).value();
                                    memberCoinIndexExchange.setExchangeName(exchangeName);


                                    Part partSel = partMap.getFirst("selected[" + i + "]");
                                    if (partSel != null) {
                                        String selected = ((FormFieldPart) partSel).value();
                                        if ("true".equals(selected)) {
                                            memberCoinIndexExchange.setSelected(true);
                                        } else {
                                            memberCoinIndexExchange.setSelected(false);
                                        }
                                    } else {
                                        memberCoinIndexExchange.setSelected(false);
                                    }


//                                    log.debug("]-----] MemberHandler::exchangeCodeParts [-----[ {}", partMap.getFirst("exchangeCode[" + i + "]").content());
//                                    log.debug("]-----] MemberHandler::exchangeCodeParts [-----[ {}", partMap.getFirst("selected[" + i + "]").content());
                                    memberCoinIndexExchanges.add(memberCoinIndexExchange);
                                }

                                memberCoinIndexExchangeRepository.deleteAllByMemberId(memberId);
                                memberCoinIndexExchangeRepository.saveAll(memberCoinIndexExchanges);

                                List<MemberCoinIndexToken> memberCoinIndexTokens = new ArrayList<>();
                                for (int i = 0; i < 109; i++) {
                                    MemberCoinIndexToken memberCoinIndexToken = new MemberCoinIndexToken();
                                    memberCoinIndexToken.setMemberId(memberId);
                                    Part part = partMap.getFirst("tokenCode[" + i + "]");
                                    log.debug("]-----] MemberHandler::part [-----[ {}", part);
                                    String tokenCode = ((FormFieldPart) part).value();
                                    memberCoinIndexToken.setTokenCode(tokenCode);

                                    Part partSel = partMap.getFirst("selectedToken[" + i + "]");
                                    log.debug("]-----] MemberHandler::partSel [-----[ {}", partSel);
                                    if (partSel != null) {
                                        String selected = ((FormFieldPart) partSel).value();
                                        if ("true".equals(selected)) {
                                            memberCoinIndexToken.setSelected(true);
                                        } else {
                                            memberCoinIndexToken.setSelected(false);
                                        }
                                    } else {
                                        memberCoinIndexToken.setSelected(false);
                                    }


                                    memberCoinIndexTokens.add(memberCoinIndexToken);
                                }
                                memberCoinIndexTokenRepository.deleteAllByMemberId(memberId);
                                memberCoinIndexTokenRepository.saveAll(memberCoinIndexTokens);
                                return Mono.justOrEmpty(1);
                            });

                })
                .flatMap(integer -> ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(integer)))
                .switchIfEmpty(notFound().build());
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findCoinIndex(ServerRequest request) {

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    MemberCoinIndex memberCoinIndex = new MemberCoinIndex();
                    memberCoinIndex.setMemberCoinIndexExchanges(memberCoinIndexExchangeRepository.findAllByMemberId(memberId));
                    memberCoinIndex.setMemberCoinIndexTokens(memberCoinIndexTokenRepository.findAllByMemberId(memberId));
                    return Mono.justOrEmpty(memberCoinIndex);
                })

                .flatMap(index -> ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(index)))
                .switchIfEmpty(notFound().build());
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> coinIndexMine(ServerRequest request) {

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId ->
                        Mono.justOrEmpty(memberCoinIndexTokenRepository.findTop12ByMemberIdAndSelected(memberId, true))
                )
                .flatMap(index -> ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(index)))
                .switchIfEmpty(notFound().build());
    }

}



