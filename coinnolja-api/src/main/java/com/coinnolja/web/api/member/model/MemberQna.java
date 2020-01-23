package com.coinnolja.web.api.member.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class MemberQna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private Long memberId;

    private Long createdAt = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();

    @Column(columnDefinition = "TEXT", nullable = true)
    private String answer;

    @ColumnDefault("0")
    private int hasAnswer;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "memberId", insertable = false, updatable = false)
    private MemberSimple member;

}
