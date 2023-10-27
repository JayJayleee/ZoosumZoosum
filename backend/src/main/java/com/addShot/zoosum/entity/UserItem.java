package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserItemId;
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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "USER_ITEM")
@NoArgsConstructor
public class UserItem {

    @EmbeddedId
    private UserItemId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    @MapsId("itemId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false)
    private Item item;

    @Column(name = "selected", columnDefinition = "TINYINT DEFAULT 0")
    private Boolean selected;

    @Embedded
    private Time time;

    @Builder
    public UserItem(UserItemId id, User user, Item item, Boolean selected, Time time) {
        this.id = id;
        this.user = user;
        this.item = item;
        this.selected = selected;
        this.time = time;
    }

    public ItemResponseDto toResponse(UserItem userItem) {
        return ItemResponseDto.builder()
            .itemId(userItem.item.getItmeId())
            .itemName(userItem.item.getItemName())
            .itemType(userItem.item.getItemType().toString())
            .fileUrl(userItem.item.getFileUrl())
            .selected(userItem.selected)
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
        UserItem userItem = (UserItem) o;
        return Objects.equals(id, userItem.id) && Objects.equals(user,
            userItem.user) && Objects.equals(item, userItem.item) && Objects.equals(
            selected, userItem.selected) && Objects.equals(time, userItem.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, item, selected, time);
    }
}
