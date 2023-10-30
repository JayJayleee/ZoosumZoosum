package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.enums.ItemType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "ITEM")
@NoArgsConstructor
public class Item {

    // 아이템 ID
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Long itmeId;

    // 아이템 유형
    @Enumerated(EnumType.STRING)
    @Column(name = "item_type", nullable = false, columnDefinition = "VARCHAR(20)")
    private ItemType itemType;

    // 아이템 명
    @Column(name = "item_name", nullable = false)
    private String itemName;

    // 아이템 URL
    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Builder
    public Item(Long itmeId, ItemType itemType, String itemName, String fileUrl) {
        this.itmeId = itmeId;
        this.itemType = itemType;
        this.itemName = itemName;
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
        Item item = (Item) o;
        return Objects.equals(itmeId, item.itmeId) && itemType == item.itemType
            && Objects.equals(itemName, item.itemName) && Objects.equals(fileUrl,
            item.fileUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itmeId, itemType, itemName, fileUrl);
    }
}
