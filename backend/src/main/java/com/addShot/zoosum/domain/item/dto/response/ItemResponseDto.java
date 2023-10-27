package com.addShot.zoosum.domain.item.dto.response;

import com.addShot.zoosum.entity.enums.ItemType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemResponseDto {

    private Long itemId;
    private String itemName;
    private String itemType;
    private String fileUrl;
    private Boolean selected;

}
