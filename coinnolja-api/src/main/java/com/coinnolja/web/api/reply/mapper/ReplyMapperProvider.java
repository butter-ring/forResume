package com.coinnolja.web.api.reply.mapper;

import com.coinnolja.web.api.common.model.Paging;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

@Slf4j
public class ReplyMapperProvider {



    public String findAllReply(@Param("paging") Paging paging, @Param("boardId") Long boardId, @Param("active") int active) {

        String sql = "" +
                "select r.id\n" +
                "     , r.active\n" +
                "     , r.created_at\n" +
                "     , r.updated_at\n" +
                "     , r.board_id\n" +
                "     , r.content\n" +
                "     , r.dep_count\n" +
                "     , r.member_id\n" +
                "     , r.parent_id\n" +
                "     , r.judge_count\n" +
                "     , r.child_count\n" +
                "     , r.down_vote_count\n" +
                "     , r.up_vote_count\n" +
                "     , (select id from member where id = r.member_id)                as `member.id`\n" +
                "     , (select username from member where id = r.member_id)          as `member.username`\n" +
                "     , (select nick_name from member where id = r.member_id)         as `member.nick_name`\n" +
                "     , (select profile_image_url from member where id = r.member_id) as `member.profile_image_url`\n" +
                "     , (select member_level from member where id = r.member_id)      as `member.member_level`\n" +
                "     , (select member_experience from member where id = r.member_id) as `member.member_experience`\n" +
                "     , (select case when is_admin = 1 then true else false end from member where id = r.member_id)          as `member.is_admin`\n" +
                "     , (select id from board where id = r.board_id)          as `board.id`\n" +
                "from (\n" +
                "         SELECT sg.id\n" +
                "              , active\n" +
                "              , created_at\n" +
                "              , updated_at\n" +
                "              , board_id\n" +
                "              , content\n" +
                "              , dep_count\n" +
                "              , member_id\n" +
                "              , parent_id\n" +
                "              , judge_count\n" +
                "              , child_count\n" +
                "              , down_vote_count\n" +
                "              , up_vote_count\n" +
                "         FROM (\n" +
                "                  SELECT start_with_connect_by(id) AS id, @level AS level\n" +
                "                  FROM (\n" +
                "                           SELECT @start_with := 0,\n" +
                "                                  @id := @start_with,\n" +
                "                                  @level := 0\n" +
                "                       ) vars,\n" +
                "                       reply\n" +
                "                  WHERE @id IS NOT NULL\n" +
                "              ) sg2\n" +
                "                  JOIN reply sg\n" +
                "                       ON sg.id = sg2.id\n" +
                "     ) r\n" +
                "where r.board_id = #{boardId} and r.active = #{active} and r.judge_count < 11";
        StringBuilder builder = new StringBuilder(sql);

        builder.append(" LIMIT #{paging.firstIndex}, #{paging.pageSize} ");

        log.debug("]-----] findAllReply sql [-----[ {}", builder.toString());
        return builder.toString();
    }


    public String findAllReplyCount(@Param("paging") Paging paging, @Param("boardId") Long boardId, @Param("active") int active) {
        String sql = new SQL() {{
            SELECT(
                    "count(*)"
            );
            FROM("reply");
            WHERE("active = #{active}");
            AND();
            WHERE("board_id = #{boardId}");
            AND();
            WHERE("judge_count < 11");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        return builder.toString();
    }

}
