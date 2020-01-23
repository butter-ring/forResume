package com.coinnolja.web.api.board.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.hibernate.annotations.Where;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Category extends BaseEntity {

    private String title;

    @Column(name = "parent_id")
    private Long parentId;

    private boolean isRoot;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id", insertable = false, updatable = false)
    private CategoryParent parent;

    @OneToMany(mappedBy = "parentId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Where(clause = "active = 1")
    private List<Category> children;

    @OneToMany(mappedBy = "categoryId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<BoardCategory> boardCategorys;
}


