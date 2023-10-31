package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserBadgeId implements Serializable {

	private String userId;
	private String badgeId;

	public UserBadgeId() {}
	public UserBadgeId(String userId, String badgeId) {}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		UserBadgeId that = (UserBadgeId) o;
		return Objects.equals(userId, that.userId) && Objects.equals(badgeId,
			that.badgeId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, badgeId);
	}
}
