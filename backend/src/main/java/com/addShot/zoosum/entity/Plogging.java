package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.enums.ActivityType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Objects;
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

    public Plogging(Long activityId, User user, ActivityType activityType, String fileUrl,
        Time time, Integer ploggingLength, Integer ploggingTime,
        Integer ploggingTrash) {
        super(activityId, user, activityType, fileUrl, time);
        this.ploggingLength = ploggingLength;
        this.ploggingTime = ploggingTime;
        this.ploggingTrash = ploggingTrash;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Plogging plogging = (Plogging) o;
        return Objects.equals(ploggingLength, plogging.ploggingLength)
            && Objects.equals(ploggingTime, plogging.ploggingTime)
            && Objects.equals(ploggingTrash, plogging.ploggingTrash);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), ploggingLength, ploggingTime, ploggingTrash);
    }
}
