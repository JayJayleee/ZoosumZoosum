package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.enums.ActivityCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "ACTIVITY_HISTORY")
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
public class ActivityHistory {

    // 활동내역 ID
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id", nullable = false)
    private Long activityId;

    // 사용자 ID 참조키
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 활동내역 종류
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_category", length = 10, nullable = false, columnDefinition = "VARCHAR(10)")
    private ActivityCategory activityCategory;

    // 파일경로
    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    // 시간
    @Embedded
    private Time time;

    public ActivityHistory(Long activityId, User user, ActivityCategory activityCategory,
        String fileUrl, Time time) {
        this.activityId = activityId;
        this.user = user;
        this.activityCategory = activityCategory;
        this.fileUrl = fileUrl;
        this.time = time;
    }
}
