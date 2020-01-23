package com.coinnolja.web.api.board.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "category")
public class CategoryParent extends BaseEntity {

    private String title;

    @Column(name = "parent_id")
    private Long parentId;

    private boolean isRoot;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id", insertable = false, updatable = false)
    private CategoryParent parent;

//    @OneToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "category_id", insertable = false, updatable = false, referencedColumnName = "id")
//    private BoardCategory boardCategory;

    @OneToMany(mappedBy = "categoryId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<BoardCategory> boardCategorys;


}


