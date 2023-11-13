package com.addShot.zoosum.domain.item.dto.response;

import com.addShot.zoosum.entity.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponseDto {

    // 아이템 ID
    private Long itemId;
    // 아이템 명
    private String itemName;
    // 아이템 유형
    private String itemType;
    // 아이템 URL
    private String fileUrl;
    // 선택 여부
    private Boolean selected;

}
