package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.enums.ActivityCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "PLOGGING")
@SuperBuilder
@NoArgsConstructor
public class Plogging extends ActivityHistory {

    // 플로깅 거리(m)
    @Column(name = "plogging_length", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer ploggingLength;

    // 플로깅 시간(s)
    @Column(name = "plogging_time", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer ploggingTime;

    // 플로깅 쓰레기 개수
    @Column(name = "plogging_trash", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer ploggingTrash;

    public Plogging(Long activityId, User user, ActivityCategory activityCategory, String fileUrl,
        Time time, Integer ploggingLength, Integer ploggingTime,
        Integer ploggingTrash) {
        super(activityId, user, activityCategory, fileUrl, time);
        this.ploggingLength = ploggingLength;
        this.ploggingTime = ploggingTime;
        this.ploggingTrash = ploggingTrash;
    }
}
