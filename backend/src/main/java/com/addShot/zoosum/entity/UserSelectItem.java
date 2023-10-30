package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.UserItemId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "USER_SELECT_ITEM")
@NoArgsConstructor
public class UserSelectItem {

    // 복합키 정의 ID
    @EmbeddedId
    private UserItemId id;

    // 사용자 ID 참조키 + 기본키
    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    // 아이템 ID 참조키 + 기본키
    @MapsId("itemId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false)
    private Item item;

    public UserSelectItem(User user, Item item) {
        this.user = user;
        this.item = item;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserSelectItem that = (UserSelectItem) o;
        return Objects.equals(user, that.user) && Objects.equals(item, that.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, item);
    }
}
