package com.coinnolja.web.api.member.view;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.math.RoundingMode;

//@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberLevel {

    public int memberExperience;
    public int memberLevel;
    public int nextExperience;
    public int prevExperience;
    public BigDecimal experienceRate;
    public boolean maxLevel = false;

    public MemberLevel(final int memberExperience, boolean isAdmin) {
        this.memberExperience = memberExperience;
        int nextExperience = 0;
        int prevExperience = 0;
        boolean max = false;
        if (memberExperience < 100) {
            this.memberLevel = 1;
            nextExperience = 100;

        } else if (memberExperience >= 100 && memberExperience < 1000) {
            this.memberLevel = 2;
            nextExperience = 1000;
            prevExperience = 100;
        } else if (memberExperience >= 1000 && memberExperience < 5000) {
            this.memberLevel = 3;
            nextExperience = 5000;
            prevExperience = 1000;
        } else if (memberExperience >= 5000 && memberExperience < 12000) {
            this.memberLevel = 4;
            nextExperience = 12000;
            prevExperience = 5000;
        } else if (memberExperience >= 12000 && memberExperience < 20000) {
            this.memberLevel = 5;
            nextExperience = 20000;
            prevExperience = 12000;
        } else if (memberExperience >= 20000 && memberExperience < 30000) {
            this.memberLevel = 6;
            nextExperience = 30000;
            prevExperience = 20000;
        } else if (memberExperience >= 30000 && memberExperience < 40000) {
            this.memberLevel = 7;
            nextExperience = 40000;
            prevExperience = 30000;
        } else if (memberExperience >= 40000 && memberExperience < 50000) {
            this.memberLevel = 8;
            nextExperience = 50000;
            prevExperience = 40000;
        } else if (memberExperience >= 50000 && memberExperience < 70000) {
            this.memberLevel = 9;
            nextExperience = 70000;
            prevExperience = 50000;
        } else if (memberExperience >= 70000 && memberExperience < 100000) {
            this.memberLevel = 10;
            nextExperience = 100000;
            prevExperience = 70000;
        } else if (memberExperience >= 100000 && memberExperience < 200000) {
            this.memberLevel = 11;
            nextExperience = 200000;
            prevExperience = 100000;
        } else if (memberExperience >= 200000 && memberExperience < 300000) {
            this.memberLevel = 12;
            nextExperience = 300000;
            prevExperience = 200000;
        } else if (memberExperience >= 300000 && memberExperience < 450000) {
            this.memberLevel = 13;
            nextExperience = 450000;
            prevExperience = 300000;
        } else if (memberExperience >= 450000 && memberExperience < 600000) {
            this.memberLevel = 14;
            nextExperience = 600000;
            prevExperience = 450000;

        } else if (memberExperience >= 600000 && memberExperience < 950000) {
            this.memberLevel = 15;
            nextExperience = 950000;
            prevExperience = 600000;
        } else if (memberExperience >= 950000 && memberExperience < 1500000) {
            this.memberLevel = 16;
            nextExperience = 1500000;
            prevExperience = 950000;
        } else if (memberExperience >= 1500000 && memberExperience < 2800000) {
            this.memberLevel = 17;
            nextExperience = 2800000;
            prevExperience = 1500000;
        } else if (memberExperience >= 2800000 && memberExperience < 3800000) {
            this.memberLevel = 18;
            nextExperience = 3800000;
            prevExperience = 2800000;
//            this.maxLevel = true;
//            max = true;
        } else if (memberExperience >= 3800000) {
            this.memberLevel = 19;
            nextExperience = 3800000;
            prevExperience = 3800000;
            this.maxLevel = true;
            max = true;
        }


        this.nextExperience = nextExperience;
        this.prevExperience = prevExperience;
        if (max) {
            this.experienceRate = new BigDecimal("100").setScale(1, RoundingMode.FLOOR);
        } else {
            BigDecimal child = new BigDecimal(memberExperience - prevExperience);
//            log.debug("]-----] child [-----[ {}", child);
            BigDecimal parent = new BigDecimal(nextExperience - prevExperience);
            BigDecimal result = child.divide(parent, 2, RoundingMode.FLOOR).multiply(new BigDecimal("100"));
            if (memberExperience > 0) {
                this.experienceRate = result.setScale(1, RoundingMode.FLOOR);
            } else {
                this.experienceRate = BigDecimal.ZERO;
            }
        }
        if (isAdmin){
            this.memberLevel = 99;
        }


    }


}
