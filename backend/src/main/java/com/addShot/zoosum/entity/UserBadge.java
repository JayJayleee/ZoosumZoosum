package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.UserBadgeId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "USER_BADGE")
@NoArgsConstructor
public class UserBadge {

    @EmbeddedId
    private UserBadgeId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("badgeId")
	@JoinColumn(name = "badge_id")
	private Badge badge;

    @Column(name = "create_time", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP()")
    private LocalDateTime createTime;

    @Builder
    public UserBadge(UserBadgeId id, User user, Badge badge, LocalDateTime createTime) {
        this.id = id;
		this.user = user;
		this.badge = badge;
		this.createTime = createTime;
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
        return Objects.equals(id, userBadge.id) && Objects.equals(user,
            userBadge.user) && Objects.equals(badge, userBadge.badge)
            && Objects.equals(createTime, userBadge.createTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, badge, createTime);
    }
}
