package com.coinnolja.web.api.board.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"board_master_id", "category_id"}))
public class BoardCategory extends BaseEntity {

    @Column(name = "board_master_id")
    private Long boardMasterId;

    @Column(name = "category_id")
    private Long categoryId;

//    @OneToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "category_id", insertable = false, updatable = false)
//    private Category category;

}
