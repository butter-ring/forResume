package com.cubeexchange.web.api.sample;

import com.cubeexchange.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Sample extends BaseEntity {
    private String title;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;
}
