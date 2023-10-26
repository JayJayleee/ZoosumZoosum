package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Time;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
@Table(name = "USER_ITEM")
@NoArgsConstructor
public class UserItem {

    @Id @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    @Id @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false)
    private Item item;

    @Column(name = "selected", columnDefinition = "TINYINT DEFAULT 0")
    private Boolean selected;

    @Embedded
    private Time time;

    @Builder
    public UserItem(User user, Item item, Boolean selected, Time time) {
        this.user = user;
        this.item = item;
        this.selected = selected;
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserItem userItem = (UserItem) o;
        return Objects.equals(user, userItem.user) && Objects.equals(item,
            userItem.item) && Objects.equals(selected, userItem.selected)
            && Objects.equals(time, userItem.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, item, selected, time);
    }
}
