package com.coinnolja.web.api.reply.mapper;

import com.coinnolja.web.api.common.model.Paging;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface ReplyMapper {

    @SelectProvider(type = ReplyMapperProvider.class, method = "findAllReply")
    List<ReplyDTO> findAllReply(@Param("paging") Paging paging, @Param("boardId") Long boardId, @Param("active") int active);

    @SelectProvider(type = ReplyMapperProvider.class, method = "findAllReplyCount")
    Integer findAllReplyCount(@Param("paging") Paging paging, @Param("boardId") Long boardId, @Param("active") int active);


}
