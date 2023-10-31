package com.addShot.zoosum.domain.item.service;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import java.util.List;

public interface ItemService {

    /**
     * 사용자가 지닌 아이템 목록 반환
     * @param userId 사용자 아이디
     * @param itemType 아이템 타입 - ISLAND, TREE
     * @return
     */
    List<ItemResponseDto> itemList(String userId, String itemType);

    /**
     * 사용자 아이템 변경
     * USER_ITEM 테이블에 아이템 선택여부와 수정일 변경
     *  - userId와 itemId를 활용하여, 지금의 itemId가 아닌 item의 선택여부를 0으로 한다.
     *  - 지금의 itemId인 item의 선택여부를 1로 한다.
     *  - 둘 다 수정일은 현재일로.
     * USER_SELECT_ITEM 테이블에 선택 아이템 정보 변경
     *  - 지금의 itemId가 아닌 item을 지운다.
     *  - 지금의 itemId인 item을 지운다.
     *
     * @param userId 사용자 아이디
     * @param itemType 아이템 타입 - ISLAND, TREE
     * @param itemId 아이템 아이디
     * @return 변경 여부 1, 0
     */
    Long itemUpdate(String userId, String itemType, Long itemId);
}
