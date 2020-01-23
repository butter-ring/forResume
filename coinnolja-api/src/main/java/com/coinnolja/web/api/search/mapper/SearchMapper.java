package com.coinnolja.web.api.search.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface SearchMapper {

    @SelectProvider(type = SearchMapperProvider.class, method = "findRank")
    List<SearchDTO> findRank();


}
