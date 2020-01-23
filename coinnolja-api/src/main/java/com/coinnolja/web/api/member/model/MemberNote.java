package com.coinnolja.web.api.member.model;

import com.coinnolja.web.api.common.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
// @Table(name = "")
public class MemberNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private Long receiverId;
    private String content;
    private String receiverUsername;
    private String senderUsername;

    private Long sendAt = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();

    private int receiverRead;
    private int recvDel;
    private int sendDel;

//    private Long read_at = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();
//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinColumn(name = "memberId", insertable = false, updatable = false)
//    private MemberSimple member;

}
