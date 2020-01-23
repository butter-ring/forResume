package com.coinnolja.web.api.board;

import com.coinnolja.web.api.board.model.BoardMaster;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardMasterRepository extends CrudRepository<BoardMaster, Long> {


}