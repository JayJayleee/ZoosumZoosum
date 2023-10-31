package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.entity.enums.ItemType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "ITEM")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
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

    public ItemResponseDto toResponseDto(Item item) {
        return ItemResponseDto.builder()
            .itemId(item.getItmeId())
            .itemName(item.getItemName())
            .itemType(item.getItemType().toString())
            .fileUrl(item.getFileUrl())
            .build();
    }

    @Override
    public String toString() {
        return "Item{" +
            "itmeId=" + itmeId +
            ", itemType=" + itemType +
            ", itemName='" + itemName + '\'' +
            ", fileUrl='" + fileUrl + '\'' +
            '}';
    }
}
