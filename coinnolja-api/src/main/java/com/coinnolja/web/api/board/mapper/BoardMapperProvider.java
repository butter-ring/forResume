package com.coinnolja.web.api.board.mapper;

import com.coinnolja.web.api.common.model.Paging;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

public class BoardMapperProvider {

    private final String[] boardSelect = {
            "b.id"
            , "b.active"
            , "b.created_at"
            , "b.updated_at"
//            , "b.content"
            , "case when bm.is_secret = 1 then '비밀글 입니다.' else b.content end as content"
            , "b.down_vote_count"
            , "b.member_id"
            , "b.read_count"
//            , "b.title"
            , "case when bm.is_secret = 1 then '비밀글 입니다.' else b.title end as title"
            , "b.up_vote_count"
            , "b.board_master_id"
            , "b.is_top"
            , "b.sub_type"
            , "b.is_top"
            , "b.has_image"
            , "b.has_link"
            , "b.thumnail_url"
            , "b.comment_count"
            , "b.title_head"
            , "b.judge_count"
            , "case when unix_timestamp() * 1000 - b.created_at < 3600000 * 24 then 1 else 0 end as is_new"
            , "m.id as `member.id`"
            , "m.username as `member.username`"
            , "m.profile_image_url as `member.profile_image_url`"
            , "m.profile_image_small_url as `member.profile_image_small_url`"

            , "m.nick_name as `member.nick_name`"
            , "m.member_level as `member.member_level`"
            , "m.member_experience as `member.member_experience`"
            , "m.is_admin as `member.is_admin`"

            , "bm.board_name as `boardMaster.board_name`"
            , "bm.board_sub_name as `boardMaster.board_sub_name`"
            , "bm.board_sub_name_color as `boardMaster.board_sub_name_color`"

            , "bm.read_roles as `boardMaster.read_roles`"
            , "bm.write_roles as `boardMaster.write_roles`"
            , "bm.delete_roles as `boardMaster.delete_roles`"
    };

    private final String[] boardSelectMember = {
            "b.id"
            , "b.active"
            , "b.created_at"
            , "b.updated_at"
//            , "b.content"
            , "case when bm.is_secret = 1 and b.member_id = #{memberId} then b.content when bm.is_secret = 1 and b.member_id != #{memberId} then '비밀글 입니다.' else b.content end as content"
            , "b.down_vote_count"
            , "b.member_id"
            , "b.read_count"
            , "case when bm.is_secret = 1 and b.member_id = #{memberId} then b.title when bm.is_secret = 1 and b.member_id != #{memberId} then '비밀글 입니다.' else b.title end as title"
            , "b.up_vote_count"
            , "b.board_master_id"
            , "b.is_top"
            , "b.sub_type"
            , "b.is_top"
            , "b.has_image"
            , "b.has_link"
            , "b.thumnail_url"
            , "b.comment_count"
            , "b.title_head"
            , "b.judge_count"
            , "case when unix_timestamp() * 1000 - b.created_at < 3600000 * 24 then 1 else 0 end as is_new"
            , "m.id as `member.id`"
            , "m.username as `member.username`"
            , "m.profile_image_url as `member.profile_image_url`"
            , "m.profile_image_small_url as `member.profile_image_small_url`"

            , "m.nick_name as `member.nick_name`"
            , "m.member_level as `member.member_level`"
            , "m.member_experience as `member.member_experience`"
            , "m.is_admin as `member.is_admin`"

            , "bm.board_name as `boardMaster.board_name`"
            , "bm.board_sub_name as `boardMaster.board_sub_name`"
            , "bm.board_sub_name_color as `boardMaster.board_sub_name_color`"

            , "bm.read_roles as `boardMaster.read_roles`"
            , "bm.write_roles as `boardMaster.write_roles`"
            , "bm.delete_roles as `boardMaster.delete_roles`"
            , "bm.is_secret as `boardMaster.is_secret`"
    };

    public String findAllBoard(@Param("paging") Paging paging, @Param("boardMasterId") Long boardMasterId, @Param("active") int active) {

        String sql = new SQL() {{
            SELECT(
                    boardSelect
            );
            FROM("board b");
            LEFT_OUTER_JOIN("member m on m.id = b.member_id");
            LEFT_OUTER_JOIN("board_master bm on bm.id = b.board_master_id");
            WHERE("b.active = #{active}");
            AND();
            WHERE("b.board_master_id = #{boardMasterId}");
            AND();
            WHERE("b.judge_count < 11");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        if (StringUtils.isNotBlank(paging.getSearchVal())) {
            builder.append("AND (b.content like CONCAT('%',#{paging.searchVal},'%') OR b.title like CONCAT('%',#{paging.searchVal},'%') ) ");
        }
        builder.append(" ORDER BY b.id DESC ");
        builder.append(" LIMIT #{paging.firstIndex}, #{paging.pageSize} ");
        return builder.toString();
    }

    public String findAllBoardWithMember(@Param("paging") Paging paging, @Param("boardMasterId") Long boardMasterId, @Param("active") int active, @Param("memberId") Long memberId) {

        String sql = new SQL() {{
            SELECT(
                    boardSelectMember
            );
            FROM("board b");
            LEFT_OUTER_JOIN("member m on m.id = b.member_id");
            LEFT_OUTER_JOIN("board_master bm on bm.id = b.board_master_id");
            WHERE("b.active = #{active}");
            AND();
            WHERE("b.board_master_id = #{boardMasterId}");
            AND();
            WHERE("b.judge_count < 11");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        if (StringUtils.isNotBlank(paging.getSearchVal())) {
            builder.append("AND (b.content like CONCAT('%',#{paging.searchVal},'%') OR b.title like CONCAT('%',#{paging.searchVal},'%') ) ");
        }
        builder.append(" ORDER BY b.id DESC ");
        builder.append(" LIMIT #{paging.firstIndex}, #{paging.pageSize} ");
        return builder.toString();
    }

    public String findAllBoardCount(@Param("paging") Paging paging, @Param("boardMasterId") Long boardMasterId, @Param("active") int active) {
        String sql = new SQL() {{
            SELECT(
                    "count(*)"
            );
            FROM("board b");
            WHERE("active = #{active}");
            AND();
            WHERE("board_master_id = #{boardMasterId}");
            AND();
            WHERE("b.judge_count < 11");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        if (StringUtils.isNotBlank(paging.getSearchVal())) {
            builder.append("AND (b.content like CONCAT('%',#{paging.searchVal},'%') OR b.title like CONCAT('%',#{paging.searchVal},'%') ) ");
        }

        return builder.toString();
    }


    public String findAllBoardForSearch(@Param("paging") Paging paging, @Param("active") int active) {

        String sql = new SQL() {{
            SELECT(
                    boardSelect
            );
            FROM("board b");
            LEFT_OUTER_JOIN("member m on m.id = b.member_id");
            LEFT_OUTER_JOIN("board_master bm on bm.id = b.board_master_id");
            WHERE("b.active = #{active}");
            AND();
            WHERE("b.judge_count < 11");


        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        if (StringUtils.isNotBlank(paging.getSearchVal())) {
            builder.append("AND (b.content like CONCAT('%',#{paging.searchVal},'%') OR b.title like CONCAT('%',#{paging.searchVal},'%') ) ");
        }
        builder.append(" ORDER BY b.id DESC ");
        builder.append(" LIMIT #{paging.firstIndex}, #{paging.pageSize} ");
        return builder.toString();
    }

    public String findAllBoardForSearchCount(@Param("paging") Paging paging, @Param("active") int active) {
        String sql = new SQL() {{
            SELECT(
                    "count(*)"
            );
            FROM("board b");
            WHERE("active = #{active}");
            AND();
            WHERE("b.judge_count < 11");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        if (StringUtils.isNotBlank(paging.getSearchVal())) {
            builder.append("AND (b.content like CONCAT('%',#{paging.searchVal},'%') OR b.title like CONCAT('%',#{paging.searchVal},'%') ) ");
        }

        return builder.toString();
    }


    public String findTopBoard(@Param("boardMasterId") Long boardMasterId, @Param("active") int active) {

        String sql = new SQL() {{
            SELECT(
                    boardSelect
            );
            FROM("board b");
            LEFT_OUTER_JOIN("member m on m.id = b.member_id");
            LEFT_OUTER_JOIN("board_master bm on bm.id = b.board_master_id");
            WHERE("b.active = #{active}");
            AND();
            WHERE("b.board_master_id = #{boardMasterId}");
            AND();
            WHERE("b.is_top = 1");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);


        builder.append(" ORDER BY b.id DESC ");
        builder.append(" LIMIT 10 ");
        return builder.toString();
    }
}
