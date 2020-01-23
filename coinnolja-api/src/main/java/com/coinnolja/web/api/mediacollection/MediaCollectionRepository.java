package com.coinnolja.web.api.mediacollection;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MediaCollectionRepository extends CrudRepository<MediaCollection, Long> {

    List<MediaCollection> findAllByCollectionUuidAndActive(String collectionUuid, int active);

    @Modifying
    @Transactional
    @Query(value = "delete from media_collection where collection_uuid = :collectionUuid", nativeQuery = true)
    void deleteAllByCollectionUuid(@Param("collectionUuid") String collectionUuid);

}
