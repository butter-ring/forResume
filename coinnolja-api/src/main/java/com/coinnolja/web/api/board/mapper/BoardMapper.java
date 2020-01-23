package com.coinnolja.web.api.board.mapper;

import com.coinnolja.web.api.common.model.Paging;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface BoardMapper {

    @SelectProvider(type = BoardMapperProvider.class, method = "findAllBoard")
    List<BoardDTO> findAllBoard(@Param("paging") Paging paging, @Param("boardMasterId") Long boardMasterId, @Param("active") int active);


    @SelectProvider(type = BoardMapperProvider.class, method = "findAllBoardWithMember")
    List<BoardDTO> findAllBoardWithMember(@Param("paging") Paging paging, @Param("boardMasterId") Long boardMasterId, @Param("active") int active, @Param("memberId") Long memberId);

    @SelectProvider(type = BoardMapperProvider.class, method = "findAllBoardCount")
    Integer findAllBoardCount(@Param("paging") Paging paging, @Param("boardMasterId") Long boardMasterId, @Param("active") int active);


    @SelectProvider(type = BoardMapperProvider.class, method = "findAllBoardForSearch")
    List<BoardDTO> findAllBoardForSearch(@Param("paging") Paging paging, @Param("active") int active);

    @SelectProvider(type = BoardMapperProvider.class, method = "findAllBoardForSearchCount")
    Integer findAllBoardForSearchCount(@Param("paging") Paging paging, @Param("active") int active);

    @SelectProvider(type = BoardMapperProvider.class, method = "findTopBoard")
    List<BoardDTO> findTopBoard(@Param("boardMasterId") Long boardMasterId, @Param("active") int active);



}
