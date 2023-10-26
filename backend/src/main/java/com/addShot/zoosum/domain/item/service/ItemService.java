package com.addShot.zoosum.domain.item.service;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import java.util.List;

public interface ItemService {

    /**
     * 사용자가 지닌 아이템 목록 반환
     * @param userId
     * @return
     */
    List<ItemResponseDto> itemList(String userId);
}
