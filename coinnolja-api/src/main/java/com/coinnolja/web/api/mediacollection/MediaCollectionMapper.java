package com.coinnolja.web.api.mediacollection;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MediaCollectionMapper {

    @Select(
            "SELECT " +
                    " m.id " +
                    ", m.collection_uuid " +
                    ", m.origin_name " +
                    ", m.modify_name " +
                    ", m.media_type " +
                    ", m.path " +
                    ", m.full_path " +
                    ", m.full_path_small " +
                    ", m.full_path_medium " +
                    ", m.full_path_reduce " +
                    ", m.hash_code " +
                    ", m.image_ext " +
                    ", m.movie_key " +
                    "FROM media_collection m " +
                    "WHERE m.collection_uuid = #{collectionUuid} "

    )
    List<MediaCollectionDTO> findByCollectionUuid(@Param("collectionUuid") String collection_uuid);

}
