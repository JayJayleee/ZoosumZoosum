package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.common.dto.response.UserBadgeResponseDto;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserBadgeId;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "USER_BADGE")
@NoArgsConstructor
@AllArgsConstructor
public class UserBadge {

    @EmbeddedId
    private UserBadgeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("badgeId")
    @JoinColumn(name = "badge_id")
    private Badge badge;

    @Column(name = "badge_get", columnDefinition = "TINYINT DEFAULT 0", nullable = false)
    private Boolean badgeGet;

    @Embedded
    private Time time;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserBadge userBadge = (UserBadge) o;
        return Objects.equals(id, userBadge.id) && Objects.equals(user,
            userBadge.user) && Objects.equals(badge, userBadge.badge)
            && Objects.equals(badgeGet, userBadge.badgeGet) && Objects.equals(time,
            userBadge.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, badge, badgeGet, time);
    }

    @Override
    public String toString() {
        return "UserBadge{" +
            "id=" + id +
            ", user=" + user +
            ", badge=" + badge +
            ", badgeGet=" + badgeGet +
            ", time=" + time +
            '}';
    }

    public void setBadgeGet(boolean b) {
        this.badgeGet = b;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public UserBadgeResponseDto toResponseDto() {
        return UserBadgeResponseDto.builder()
            .badgeId(this.getBadge().getBadgeId())
            .badgeName(this.getBadge().getBadgeName())
            .badgeCondition(this.getBadge().getBadgeCondition())
            .fileUrl(this.getBadge().getFileUrl())
            .build();
    }
}
