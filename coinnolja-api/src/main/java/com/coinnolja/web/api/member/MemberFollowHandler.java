package com.coinnolja.web.api.member;

import com.coinnolja.web.api.common.model.Paging;
import com.coinnolja.web.api.member.exception.FollowAlreadyExistsException;
import com.coinnolja.web.api.member.exception.UserNameIsAlreadyExistsException;
import com.coinnolja.web.api.member.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromObject;
import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Slf4j
@Component
public class MemberFollowHandler {

    private final MemberFollowService memberFollowService;
    private final MemberRepository memberRepository;
    private final MemberFollowRepository memberFollowRepository;


    public MemberFollowHandler(MemberFollowService memberFollowService, MemberRepository memberRepository,MemberFollowRepository memberFollowRepository) {
        this.memberFollowService = memberFollowService;
        this.memberFollowRepository = memberFollowRepository;
        this.memberRepository = memberRepository;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> follow(ServerRequest request) {
        Mono<MemberFollow> memberFollowMono = request.bodyToMono(MemberFollow.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberFollowMono
                        .flatMap(memberFollow -> {
                            memberFollow.setTargetMemberId(memberRepository.findByUsername(memberFollow.getTargetMemberName()).getId());
                            memberFollow.setMemberId(memberId);
                            // return Mono.justOrEmpty(memberFollowService.follow(memberFollow));
                            int existsCount = memberFollowRepository.countAllByMemberIdAndTargetMemberId(memberFollow.getMemberId(), memberFollow.getTargetMemberId());
                            if (existsCount > 0) {
                                log.debug("]-----] 111111111111 [-----[ ");
                                return Mono.error(new FollowAlreadyExistsException());
                            }
                            return Mono.just(memberFollow);



                        }))
                .flatMap(memberFollow -> ok().body(fromObject(memberFollow)))
                .switchIfEmpty(notFound().build());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> followSave(ServerRequest request) {
        log.info("]-----] 82822222222222::followSave call [-----[ ");
        Mono<MemberFollow> memberFollowMono = request.bodyToMono(MemberFollow.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberFollowMono
                        .flatMap(memberFollow -> {
                            memberFollow.setTargetMemberId(memberRepository.findByUsername(memberFollow.getTargetMemberName()).getId());
                            memberFollow.setMemberId(memberId);
                            return Mono.justOrEmpty(memberFollowService.followSave(memberFollow));
                                // memberFollowService.follow(memberFollow, memberId))
                        }))
                .flatMap(memberFollow -> ok().body(fromObject(memberFollow)))
                .switchIfEmpty(notFound().build());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST' )")
    public Mono<ServerResponse> followDelete(ServerRequest request) {
        log.info("]-----] 82828282::followDelete call [-----[ ");
        Mono<MemberFollow> memberFollowMono = request.bodyToMono(MemberFollow.class);
        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId -> memberFollowMono
                        .flatMap(memberFollow -> {
                            memberFollow.setTargetMemberId(memberRepository.findByUsername(memberFollow.getTargetMemberName()).getId());
                            memberFollow.setMemberId(memberId);
                            // return Mono.justOrEmpty(memberFollowService.followDelete(memberFollow));
                            memberFollowRepository.delete(memberFollowRepository.findByMemberIdAndTargetMemberId(memberFollow.getMemberId(),memberFollow.getTargetMemberId()));
                            // return Mono.justOrEmpty(memberFollowExists);
                            return Mono.error(new UserNameIsAlreadyExistsException());


                        }))
                .flatMap(memberFollow -> ok().body(fromObject(memberFollow)))
                .switchIfEmpty(notFound().build());

    }

    //회원의 친구 목록을 마이페이지에서 확인
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST')")
    public Mono<ServerResponse> followList(ServerRequest request) {
        log.info("]-----] MemberHandler::followList call [-----[ ");

        Paging paging = new Paging();

        Integer page = request.queryParam("page").isPresent() ? Integer.parseInt(request.queryParam("page").get()) - 1 : 1;
        Integer pageSize = request.queryParam("pagesize").isPresent() ? Integer.parseInt(request.queryParam("pagesize").get()) : 5;
        // Sort sort = new Sort(Sort.Direction.DESC, "sendAt");

//        paging.setPageIndex(page);
//      paging.setPageSize(pageSize);

        return request.principal()
                .flatMap(p -> Mono.just(Long.parseLong(p.getName())))
                .flatMap(memberId ->
                        Mono.just(memberFollowRepository.findAllByMemberIdOrderByTargetMemberIdAsc(PageRequest.of(page, pageSize), memberId)))
                .flatMap(memberFollow -> ok().body(fromObject(memberFollow)))
                .switchIfEmpty(notFound().build());
    }

}



