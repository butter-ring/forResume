package com.coinnolja.web.api.board.mapper;

import com.coinnolja.web.api.board.constant.BoardType;
import com.coinnolja.web.api.board.constant.SubType;
import com.coinnolja.web.api.common.model.BaseDTO;
import com.coinnolja.web.api.member.mapper.MemberDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class BoardMasterDTO extends BaseDTO {

    private BoardType boardType;
    private String boardName;
    private String boardSubName;
    private String boardSubNameColor;
    private String boardDescription;
    private String readRoles;
    private String writeRoles;
    private String deleteRoles;
    private int isSecret = 0;

}
