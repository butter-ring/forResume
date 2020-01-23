package com.coinnolja.web.api.member;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Slf4j
@Configuration
public class MemberRouter {

    @Bean
    public RouterFunction<ServerResponse> memberRouterFunction(MemberHandler handler) {

        return RouterFunctions
                .nest(path("/api/member"),
                        route(GET("/{memberId}").and(contentType(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("").and(contentType(APPLICATION_JSON_UTF8)), handler::myInfo)
                                .andRoute(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::post)
                                .andRoute(POST("/validemail").and(accept(APPLICATION_JSON_UTF8)), handler::validemail)
                                .andRoute(POST("/findmyinfo").and(accept(APPLICATION_JSON_UTF8)), handler::findMyInfo)

                )
                .andNest(path("/api/signup"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::signup)
                                .andRoute(POST("/dup").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::signupDup)
                )
                // 출석체크
                .andNest(path("/api/attend"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)), handler::attendCheck)
                                .andRoute(GET("/dayget").and(accept(APPLICATION_JSON_UTF8)), handler::dayget)
                                .andRoute(GET("/list").and(accept(APPLICATION_JSON_UTF8)), handler::attendList)
                )

                // 받아오는 데이터가 없을땐 accept만 사용한다. contentType은 받아오는 데이터가 있을 때 사용
                .andNest(path("/api/mypage"),
                        route(GET("/{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::myPage)
                                .andRoute(POST("/updateinfo").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::updateMyInfo)
                                .andRoute(POST("/checkpassword").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::checkPassword)
                                .andRoute(POST("/updatepassword").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::updatePassword)

                )

                .andNest(path("/api/myboard"),
                        route(GET("/{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::myBoardList)
                )
                // 내가 쓴 댓글목록
                .andNest(path("/api/myreply"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::myReplyList)
                )
                // 내가 받은 쪽지함
                .andNest(path("/api/notelist"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::noteList)
                                .andRoute(POST("/del").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::notedel)
                )
                // 코인 일정 가져오기
                .andNest(path("/api/coinschedule"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::coinschedule)
                )

                // 쪽지 보내기
                .andNest(path("/api/note"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::note)
                )

                .andNest(path("/api/profileimageupdate"),
                        route(GET("/{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(POST("").and(accept(APPLICATION_JSON_UTF8)), handler::profileImgUploadSingle)

                )
                .andNest(path("/api/profileimg"),
                        route(GET("/{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findProfileImageUrlById)

                )
                .andNest(path("/api/myqna"),
                        route(GET("{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::myQnAList)
                                .andRoute(GET("/detail/{id}").and(accept(APPLICATION_JSON_UTF8)), handler::findMyQnaDetail)
                                .andRoute(POST("/save").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::myQnaSave)
                                .andRoute(POST("/answer").and(accept(APPLICATION_JSON_UTF8)).and(contentType(APPLICATION_JSON_UTF8)), handler::myQnaAnswer)
                                .andRoute(GET("/notice").and(accept(APPLICATION_JSON_UTF8)), handler::qnaNotice)
                )

                .andNest(path("/api/partnership"),
                        route(POST("").and(accept(APPLICATION_JSON_UTF8)), handler::partnership)
                )

                .andNest(path("/api/memberinfo"),
                        route(GET("/{memberId}").and(accept(APPLICATION_JSON_UTF8)), handler::findById)
                                .andRoute(GET("/detail/{id}").and(accept(APPLICATION_JSON_UTF8)), handler::findMemberInfo)
                                .andRoute(GET("/board/{id}").and(accept(APPLICATION_JSON_UTF8)), handler::findMemberBoardList)
                                .andRoute(GET("/reply/{id}").and(accept(APPLICATION_JSON_UTF8)), handler::findMemberReplyList)

                )
                .andNest(path("/api/membercoinindex"),
                        route(GET("").and(accept(APPLICATION_JSON_UTF8)), handler::findCoinIndex)
                                .andRoute(POST("").and(accept(APPLICATION_JSON_UTF8)), handler::coinIndex)
                                .andRoute(GET("/mine").and(accept(APPLICATION_JSON_UTF8)), handler::coinIndexMine)

                )
                ;

    }
}
