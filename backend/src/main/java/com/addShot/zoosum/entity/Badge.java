package com.addShot.zoosum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "BADGE")
@NoArgsConstructor
public class Badge {

    // 뱃지 ID
    @Id
    @Column(name = "badge_id", length = 30, nullable = false)
    private String badgeId;

    // 뱃지명
    @Column(name = "badge_name", length = 30, nullable = false)
    private String badgeName;

    // 뱃지 획득 조건
    @Column(name = "badge_condition", length = 100, nullable = false)
    private String badgeCondition;

    // 뱃지 획득 조건 값
    @Column(name = "badge_value", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer badgeValue;

    // 파일경로
    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Builder
    public Badge(String badgeId, String badgeName, String badgeCondition, Integer badgeValue,
        String fileUrl) {
        this.badgeId = badgeId;
        this.badgeName = badgeName;
        this.badgeCondition = badgeCondition;
        this.badgeValue = badgeValue;
        this.fileUrl = fileUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Badge badge = (Badge) o;
        return Objects.equals(badgeId, badge.badgeId) && Objects.equals(badgeName,
            badge.badgeName) && Objects.equals(badgeCondition, badge.badgeCondition)
            && Objects.equals(badgeValue, badge.badgeValue) && Objects.equals(
            fileUrl, badge.fileUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(badgeId, badgeName, badgeCondition, badgeValue, fileUrl);
    }
}
