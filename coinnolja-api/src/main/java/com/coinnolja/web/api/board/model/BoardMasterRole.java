package com.coinnolja.web.api.board.model;

import com.coinnolja.web.api.auth.Role;
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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"board_master_id", "role_id"}))
public class BoardMasterRole extends BaseEntity {

    @Column(name = "board_master_id")
    private Long boardMasterId;

    @Column(name = "role_id")
    private Long roleId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Role role;
}
