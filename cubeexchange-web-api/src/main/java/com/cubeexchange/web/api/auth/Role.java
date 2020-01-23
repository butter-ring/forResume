package com.cubeexchange.web.api.auth;

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
@Entity(name = "cn_role")
public class Role extends BaseEntity {

    @Column(unique = true)
    private String role;

}
