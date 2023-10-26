package com.addShot.zoosum.entity;

import jakarta.persistence.Entity;
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
@Table(name = "USER_BADGE")
@NoArgsConstructor
public class UserBadge {

    @Id @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @Id @ManyToOne
    @JoinColumn(name = "badge_id", nullable = false)
    private Badge badgeId;

    @Builder
    public UserBadge(User userId, Badge badgeId) {
        this.userId = userId;
        this.badgeId = badgeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserBadge userBadge = (UserBadge) o;
        return Objects.equals(userId, userBadge.userId) && Objects.equals(badgeId,
            userBadge.badgeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, badgeId);
    }
}
