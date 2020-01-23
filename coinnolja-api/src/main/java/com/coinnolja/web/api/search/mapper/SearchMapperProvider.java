package com.coinnolja.web.api.search.mapper;

import org.apache.ibatis.jdbc.SQL;

public class SearchMapperProvider {


    public String findRank() {

        String sql = new SQL() {{
            SELECT(
                    "search_word"
                    , "count(*) as search_count"
            );
            FROM("search");
            WHERE("created_at  >= UNIX_TIMESTAMP(date_sub(CURRENT_TIMESTAMP(), interval 96 hour)) * 1000");
            GROUP_BY("search_word");

        }}.toString();
        StringBuilder builder = new StringBuilder(sql);

        builder.append(" ORDER BY search_count DESC ");
        builder.append(" LIMIT 10 ");
        return builder.toString();
    }


}
