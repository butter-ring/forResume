package com.coinnolja.web.api.board.model;

import com.coinnolja.web.api.board.constant.BoardType;
import com.coinnolja.web.api.board.constant.RewardType;
import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Transient;
import java.util.Arrays;
import java.util.Collection;

import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class BoardMaster extends BaseEntity {

    private BoardType boardType;
    private String boardName;
    private String boardSubName;
    private String boardSubNameColor;
    private String boardDescription;
    private String readRoles;
    private String writeRoles;
    private String deleteRoles;
    private String subCategory;
    private RewardType rewardType;
    private int levelLimit;
    private int isSecret = 0;

    @Transient
    private String subCategorys;

    public Collection<? extends String> getSubCategorys() {
        if (this.subCategory != null) {
            return Arrays.stream(this.subCategory.split("[|]")).collect(toList());
        }
        return null;

    }
}