package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import com.addShot.zoosum.entity.embedded.Plogging;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.Tree;
import com.addShot.zoosum.entity.enums.ActivityType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "ACTIVITY_HISTORY")
@Builder
@NoArgsConstructor
public class ActivityHistory {

    // 활동내역 ID
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id", nullable = false)
    private Long activityId;

    // 사용자 ID 참조키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 활동내역 종류
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", length = 10, nullable = false, columnDefinition = "VARCHAR(10)")
    private ActivityType activityType;

    // 파일경로
    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    // 플로깅
    @Embedded
    private Plogging plogging;

    // 나무
    @Embedded
    private Tree tree;

    // 시간
    @Embedded
    private Time time;

    public ActivityHistory(Long activityId, User user, ActivityType activityType, String fileUrl,
        Plogging plogging, Tree tree, Time time) {
        this.activityId = activityId;
        this.user = user;
        this.activityType = activityType;
        this.fileUrl = fileUrl;
        this.plogging = plogging;
        this.tree = tree;
        this.time = time;
    }

    public ActivityResponseDto toPloggingResponse(ActivityHistory ah) {
        return ActivityResponseDto.builder()
            .activityId(ah.activityId)
            .userId(ah.user.getUserId())
            .activityType(ah.activityType.toString())
            .fileUrl(ah.fileUrl)
            .plogging(ah.plogging)
            .time(ah.time)
            .build();
    }

    public ActivityResponseDto toTreeResponse(ActivityHistory ah) {
        return ActivityResponseDto.builder()
            .activityId(ah.activityId)
            .userId(ah.user.getUserId())
            .activityType(ah.activityType.toString())
            .fileUrl(ah.fileUrl)
            .tree(ah.tree)
            .time(ah.time)
            .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ActivityHistory that = (ActivityHistory) o;
        return Objects.equals(activityId, that.activityId) && Objects.equals(user,
            that.user) && activityType == that.activityType && Objects.equals(fileUrl,
            that.fileUrl) && Objects.equals(time, that.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(activityId, user, activityType, fileUrl, time);
    }
}
