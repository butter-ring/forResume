package com.coinnolja.web.api.reply.mapper;

import com.coinnolja.web.api.board.model.Board;
import com.coinnolja.web.api.common.model.Paging;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyList {

    private Board board;

    private List<ReplyDTO> content;

    private Paging pageable;

    private boolean last;

    private boolean first;

}
