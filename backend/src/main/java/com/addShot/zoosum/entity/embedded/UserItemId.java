package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

//유저-아이템 복합키 클래스
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserItemId implements Serializable {

	private String userId;
	private Long itemId;

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		UserItemId that = (UserItemId) o;
		return Objects.equals(userId, that.userId) && Objects.equals(itemId,
			that.itemId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, itemId);
	}
}
