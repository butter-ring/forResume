package com.cubeexchange.web.api.member;

import com.cubeexchange.web.api.auth.*;
import com.cubeexchange.web.api.auth.constant.RoleEnum;
import com.cubeexchange.web.api.auth.exception.UsernameNotFoundException;
import com.cubeexchange.web.api.common.security.jwt.JWTTokenService;
import com.cubeexchange.web.api.member.constant.MemberStatus;
import com.cubeexchange.web.api.member.constant.MemberValidType;
import com.cubeexchange.web.api.member.constant.ValidStatus;
import com.cubeexchange.web.api.member.exception.PasswordNotValidException;
import com.cubeexchange.web.api.member.model.MemberSimple;
import com.cubeexchange.web.api.member.view.MemberSignup;
import com.cubeexchange.web.api.member.view.MemberUpdate;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.web3j.crypto.*;
import reactor.core.publisher.Mono;

import java.io.File;
import java.math.BigInteger;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

//////////////////////////////////////
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
// import org.web3j.sample.contracts.generated.Greeter;
// import org.web3j.sample.contracts.generated.MetaCoin;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;
//////////////////////////////////////


import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Slf4j
@Component
public class MemberHandler {
    private final MemberRepository memberRepository;
    private final MemberValidation memberValidation;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthRoleRepository authRoleRepository;
    private final MemberValidHistoryRepository memberValidHistoryRepository;
    private final AuthRepository authRepository;
    private final MemberService memberService;

    public MemberHandler(
            MemberRepository memberRepository
            , MemberValidation memberValidation
            , PasswordEncoder passwordEncoder
            , RoleRepository roleRepository
            , AuthRoleRepository authRoleRepository
            , MemberValidHistoryRepository memberValidHistoryRepository
            , AuthRepository authRepository
            , MemberService memberService
    ) {
        this.memberRepository = memberRepository;
        this.memberValidation = memberValidation;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.authRoleRepository = authRoleRepository;
        this.memberValidHistoryRepository = memberValidHistoryRepository;
        this.authRepository = authRepository;
        this.memberService = memberService;
    }

    /**
     * GET a Member
     */
    //로그인 된 회원의 id  값 가져오기]
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> findById(ServerRequest request) {
        log.info("]-----] MemberHandler::findById call [-----[ ");
        Long id = Long.parseLong(request.pathVariable("id"));
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    Member member = memberRepository.findById(id).get();
                    return Mono.justOrEmpty(member);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    }


    /**
     * POST a MemberSignup
     */
    public Mono<ServerResponse> signup(ServerRequest request) {
        log.info("]-----] MemberHandler::signup call [-----[ ");
        Mono<MemberSignup> memberSignUpMono = request.bodyToMono(MemberSignup.class);
        InetSocketAddress ipAddress = request.remoteAddress().get();
        return memberSignUpMono
                //받아 온 데이터의 유효성 검사
                .flatMap(memberValidation::validateMemberSignup)
                .flatMap(memberSignup -> {
                    log.debug("]-----] MemberHandler::signup.memberSignup [-----[ {}", memberSignup);
                    Member member = new Member();
                    member.setUsername(memberSignup.getUsername());
                    String encryptPassword = passwordEncoder.encode(memberSignup.getPassword());
                    member.setPassword(encryptPassword);
                    member.setStatus(MemberStatus.ACTIVE);

                    //서비스로 빼고 트렌잭션으로 묶기
                    // return
//                            Mono.just(memberRepository.save(member)).doOnSuccess(m -> {
//                        Role role = roleRepository.findByRole(RoleEnum.GUEST.getCode());
//                        log.debug("]-----] MemberHandler::signup.role [-----[ {}", role);
//                        AuthRole authRole = new AuthRole();
//                        authRole.setAuthId(member.getId());
//                        authRole.setRoleId(role.getId());
//                        // role 저장
//                        authRoleRepository.save(authRole);
                    return memberService.signup(member);
                    }).switchIfEmpty(Mono.empty())
                .flatMap(member -> {
                    //email 인증을 위한 랜덤 문자 생성 후 저장
                    log.debug("]-----] MemberHandler::signup.member [-----[ {}", member);
                    MemberValidationHistory memberValidationHistory = new MemberValidationHistory();
                    memberValidationHistory.setMemberId(member.getId());
                    String validString = RandomStringUtils.randomAlphabetic(20);
                    memberValidationHistory.setValidString(validString);
                    memberValidationHistory.setValidType(MemberValidType.EMAIL);
                    memberValidationHistory.setUsername(member.getUsername());
                    log.debug("]-----] MemberHandler::signup.memberValidationHistory [-----[ {}", memberValidationHistory);
                    memberValidHistoryRepository.save(memberValidationHistory);
                    return Mono.just(memberValidationHistory);
                })
                // 이메일 발송
                .flatMap(memberValidation::validateEmailSend)
                .flatMap(history -> {
                    memberRepository.updateVlidStatus(history.getMemberId(), ValidStatus.DOING.getCode());
                    return Mono.just(history.getCreatedAt());
                })
                .flatMap(member -> ServerResponse.status(HttpStatus.CREATED)
                        .contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(member)))
                .switchIfEmpty(badRequest().build());

    } // MemberSignup end


    @PreAuthorize("hasAnyAuthority('ROLE_GUEST')")
    public Mono<ServerResponse> emailAuth(ServerRequest request) {
        log.info("]-----] MemberHandler::emailAuth call [-----[ ");
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member -> {
                    log.debug("]-----] MemberHandler::emailAuth.member [-----[ {}", member);
                    AuthRole authRole;
                    authRole = authRoleRepository.findByAuthIdAndActive(member.getId(), 1);
                    if(authRole.getRoleId()==3) {
                        MemberValidationHistory memberValidationHistory = memberValidHistoryRepository.findByMemberIdAndActive(member.getId(), 1);
                        String validString = RandomStringUtils.randomAlphabetic(20);
                        log.debug("]-----] MemberHandler::emailAuth.validString [-----[ {}", validString);
                        memberValidationHistory.setValidString(validString);
                        memberValidationHistory.setValidType(MemberValidType.EMAIL);
                        log.debug("]-----] MemberHandler::emailAuth.memberValidationHistory [-----[ {}", memberValidationHistory);
                        memberValidHistoryRepository.save(memberValidationHistory);
                        return Mono.just(memberValidationHistory);
                    }
                    return Mono.error(new UsernameNotFoundException());
                })
                .flatMap(memberValidation::validateEmailSend)
                .flatMap(history -> {
                    memberRepository.updateVlidStatus(history.getMemberId(), ValidStatus.DOING.getCode());
                    return Mono.just(history.getCreatedAt());
                })
                .flatMap(member -> ServerResponse.status(HttpStatus.CREATED)
                        .contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(member)))
                .switchIfEmpty(badRequest().build());
    }

    /**
     *  signupDup (nickName 중복체크)
     */
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> signupDup(ServerRequest request) {
        log.info("]-----] MemberHandler::signup call [-----[ ");
        return request.bodyToMono(MemberSimple.class)
                .flatMap(membersimple-> Mono.just(memberRepository.countAllByNickNameAndActive(membersimple.getNickName(), 1)))
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    } // signupDup end

    public Mono<ServerResponse> validemail(ServerRequest request) {
        return request.principal()
                .map(p -> Long.parseLong(p.getName()))
                .flatMap(userId -> Mono.just(memberRepository.findById(userId).get()))
                .flatMap(user -> memberValidation.validateEmailRequest(user, request.bodyToMono(MemberValidationHistory.class)))
                .flatMap(history -> {
                    memberRepository.updateVlidStatus(history.getMemberId(), ValidStatus.DONE.getCode());
                    Role role = roleRepository.findByRole(RoleEnum.USER.getCode());
                    log.debug("]-----] MemberHandler::signup.role [-----[ {}", role);
                    AuthRole authRole = authRoleRepository.findByAuthIdAndActive(history.getMemberId(), 1);
                    authRole.setAuthId(history.getMemberId());
                    authRole.setRoleId(role.getId());
                    authRoleRepository.save(authRole);
                    Auth auth = authRepository.findByIdAndActive(history.getMemberId(), 1);
                    return Mono.just(String.join(" ", "Bearer", JWTTokenService.generateToken(auth.getUsername(), auth.getAuthorities(), auth)));
                })
                .flatMap(user -> ok().contentType(MediaType.APPLICATION_JSON_UTF8).body(fromObject(user)))
                .switchIfEmpty(notFound().build());
    } // validemail end

    // 마이페이지 정보 불러오기 memberSimple에 담는다.
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> getMemberInfo(ServerRequest request) {
        log.info("]-----] MemberHandler::myPage call [-----[ ");
        MemberSimple memberSimple = new MemberSimple();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member -> {
                    memberSimple.setValidStatus(member.getValidStatus());
                    memberSimple.setUsername(member.getUsername());
                    memberSimple.setStatus(member.getStatus());
                    memberSimple.setNickName(member.getNickName());
                    memberSimple.setLastSigninAt(member.getLastSigninAt());
                    memberSimple.setCreatedAt(member.getCreatedAt());
                    memberSimple.setRealName(member.getRealName());
                    memberSimple.setAdmin(member.isAdmin());
                    memberSimple.setAuthKeystatus(member.isAuthKeystatus());
                    memberSimple.setAuthKeyactive(member.isAuthKeyactive());
                    memberSimple.setAuthEmail(member.isAuthEmail());
                    memberSimple.setAuthKey(member.getAuthKey());
                    memberSimple.setAuthKeyurl(member.getAuthKeyurl());
                    return Mono.just(memberSimple);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    } // myPage end

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
                    member.setRealName(memberUpdate.getRealName());
                    member.setNickName(memberUpdate.getNickName());
                    log.info("]-----] memberHandler::member [-----[ {}", memberUpdate);
                    return Mono.just(memberRepository.save(member));
                }))
                .flatMap(memberUpdate -> ok().body(fromObject(memberUpdate)))
                .switchIfEmpty(notFound().build());
    } // updateMyInfo End

    // 비밀번호 비교
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
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

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> getMemberAccount(ServerRequest request) {
        log.info("]-----] MemberHandler::getMemberAccount call [-----[ ");
        MemberSimple memberSimple = new MemberSimple();
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> Mono.just(memberRepository.findById(memberId).get()))
                .flatMap(member -> {
                    // memberSimple.setValidStatus(member.getValidStatus());
                    memberSimple.setUsername(member.getUsername());
                    memberSimple.setStatus(member.getStatus());
                    // memberSimple.setNickName(member.getNickName());
                    memberSimple.setLastSigninAt(member.getLastSigninAt());
                    memberSimple.setCreatedAt(member.getCreatedAt());
                    memberSimple.setRealName(member.getRealName());
                    memberSimple.setAdmin(member.isAdmin());
                    memberSimple.setAuthKeystatus(member.isAuthKeystatus());
                    memberSimple.setAuthKeyactive(member.isAuthKeyactive());
                    memberSimple.setAuthEmail(member.isAuthEmail());
                    memberSimple.setAuthKey(member.getAuthKey());
                    memberSimple.setAuthKeyurl(member.getAuthKeyurl());
                    memberSimple.setEthPublic(member.getEthPublic());
                    return Mono.just(memberSimple);
                })
                .flatMap(member -> ok().body(fromObject(member)))
                .switchIfEmpty(notFound().build());
    } // getMemberAccount end

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> generatewallet(ServerRequest request){

        try {
            log.info("]-----] generatewallet:: call [-----[ ");
            // Generate Full New Wallet File = 지갑 파일 생성
            //String walletFileName = WalletUtils.generateFullNewWalletFile("coinnolja",new File("/home/carmack/Dev/git/eth/"));
            //log.info("walletFileName is = " + walletFileName);

            // 지갑 파일로 주소 확인
            //String[] fetchAddress=walletFileName.split("--");
            //log.info("fetchAddress is = " + fetchAddress);

            // 파일생성 없이 주소 생성
            String seed = UUID.randomUUID().toString();

            ECKeyPair ecKeyPair = Keys.createEcKeyPair();
            BigInteger privateKeyInDec = ecKeyPair.getPrivateKey();

            String sPrivatekeyInHex = privateKeyInDec.toString(16);

            WalletFile aWallet = Wallet.createLight(seed, ecKeyPair);
            String sAddress = aWallet.getAddress();


            log.info("sPrivatekeyInHex is = " + sPrivatekeyInHex);
            log.info("sAddress is = 0x" + sAddress);

            // 이더 주소 확인
            // String getAddress = fetchAddress[fetchAddress.length-1].split("\\.")[0];
            // log.info("getAddress is = " + getAddress);

            return request.principal()
                    .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                    .flatMap(memberId -> {
                        Member member;
                        member = memberRepository.findById(memberId).get();
                        member.setEthPublic("0x"+sAddress);
                        member.setEthPrivate(sPrivatekeyInHex);
                        memberRepository.save(member);
                        return Mono.justOrEmpty("0x"+sAddress);
                    })
                    .flatMap(wallet -> ok().body(fromObject(wallet)))
                    .switchIfEmpty(notFound().build());
        }catch(Exception e){

        }


        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    return Mono.justOrEmpty("error");
                })
                .flatMap(wallet -> ok().body(fromObject(wallet)))
                .switchIfEmpty(notFound().build());
    }

    // OTP 키 생성, 유저 DB에 저장
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> otp(ServerRequest request){
        log.info("]-----] OTP :: call [-----[ ");

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> {
                    Mono.justOrEmpty(memberRepository.findById(memberId).get());
                    Member member;
                    member = memberRepository.findById(memberId).get();
                    log.info("------isAuthKeystatus --------[   {}", member.isAuthKeystatus());
                    // isAuthKeystatus가 false면 키를 생성해야하고, 버튼 누르면 -> 바로저장
                    if( member.isAuthKeystatus() == false ){
                        GoogleAuthenticator gAuth = new GoogleAuthenticator();
                        final GoogleAuthenticatorKey key = gAuth.createCredentials();
                        log.info("]-----] GoogleAuthenticator,key.getKey [-----[ {}", key.getKey());
                        String secret = key.getKey();
                        String user = member.getUsername();  // 여기에 유저 이메일 넣자
                        String host = "jopax.com";

                        String format2 = "http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=otpauth://totp/%s@%s%%3Fsecret%%3D%s&chld=H|0";
                        String url = String.format(format2, user, host, secret);
                        member.setAuthKey(secret);
                        member.setAuthKeyurl(url);
                        member.setAuthKeystatus(true);
                        memberRepository.save(member);
                        return Mono.justOrEmpty(member);
                    }

                       //  return Mono.just(memberRepository.save(member));
                    return Mono.justOrEmpty(member);
                })
                .flatMap(otp -> ok().body(fromObject(otp)))
                .switchIfEmpty(notFound().build());
    }

    // 6자리 OTP 코드 확인
    public Mono<ServerResponse> otpcheck(ServerRequest request) {
        log.info("]-----] otpcheck :: call [-----[ ");
        Mono<JSONObject> otpdigitMono = request.bodyToMono(JSONObject.class);

        return otpdigitMono.
                flatMap(otp -> {
                    Member member;
                    log.info("]-----] OTP CHECK otp:: call [-----[ {}",otp.get("useridnum"));
                    if(otp.get("useridnum") != null){
                        member = memberRepository.findById(Long.valueOf(String.valueOf(otp.get("useridnum")))).get();
                    }else{
                        return Mono.error(new PasswordNotValidException());
                    }
        // OTP 인증 절차 시작
        String secretKey = member.getAuthKey();
        String secretCode = otp.get("otpdigit").toString();

        final GoogleAuthenticator gAuth = new GoogleAuthenticator();
        final long KEY_VALIDATION_INTERVAL_MS = TimeUnit.SECONDS.toMillis(30);
        int lastUsedPassword = -1; // last successfully used password
        long lastVerifiedTime = 0; // time of last success
        AtomicInteger windowSize = new AtomicInteger(3);

        Integer totp = Integer.valueOf((secretCode.equals("") ? "-1" : secretCode));

        boolean unused = false;
        long now = new Date().getTime();
        long timeslotNow = now / KEY_VALIDATION_INTERVAL_MS;
        long timeslotThen = lastVerifiedTime / KEY_VALIDATION_INTERVAL_MS;

        int forwardTimeslots = ((windowSize.get() - 1) / 2);

        if (totp != lastUsedPassword || timeslotNow > timeslotThen + forwardTimeslots) {
            lastUsedPassword = totp;
            lastVerifiedTime = now;
            unused = true;
        } else {
            unused = false;
        }
        // 최종 6자리 코드 일치 확인
        boolean matches = gAuth.authorize(secretKey, totp);
        if (unused && matches) {
            log.info("]-----] GoogleAuthenticator OTP is TRUE [-----[ ");
            member.setAuthKeyactive(true);
            memberRepository.save(member);
            return Mono.justOrEmpty(true);
        } else {
            log.info("]-----] GoogleAuthenticator OTP is FALSE [-----[ ");
            return Mono.justOrEmpty(false);
        }

    })
    .flatMap(otp -> ok().body(fromObject(otp)))
    .switchIfEmpty(notFound().build());

    }
}
