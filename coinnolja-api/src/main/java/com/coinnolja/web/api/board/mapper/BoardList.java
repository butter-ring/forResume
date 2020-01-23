package com.coinnolja.web.api.board.mapper;

import com.coinnolja.web.api.board.model.BoardMaster;
import com.coinnolja.web.api.common.model.Paging;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardList {

    private BoardMaster boardMaster;

    private List<BoardDTO> content;

    private Paging pageable;

    private boolean last;

    private boolean first;

}
