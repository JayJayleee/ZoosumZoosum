package com.addShot.zoosum.domain.item.repository;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.enums.ItemType;
import java.util.List;

public interface UserItemCustomRepository {

    /**
     * ITEM과 USER_ITEM을 join하여 아이템 목록 반환
     * @param userId
     * @return 아이템 ID, 선택여부, 아이템 유형, 아이템 이름, 파일 경로
     */
    List<UserItem> findAllByUserId(String userId, ItemType itemType);

    /**
     * 사용자 아이템 변경
     * USER_ITEM 테이블에 아이템 선택여부와 수정일 변경
     *  - userId와 itemId를 활용하여, 지금의 itemId가 아닌 item의 선택여부를 0으로 한다. (UPDATE)
     *  - 지금의 itemId인 item의 선택여부를 1로 한다. (UPDATE)
     *  - 둘 다 수정일은 현재일로.
     *
     * ### 아래 부분에서 INSERT문 적용이 안된다. ###
     * USER_SELECT_ITEM 테이블에 선택 아이템 정보 변경
     *  - 지금의 itemId가 아닌 item을 (DELETE)
     *  - 지금의 itemId인 item을 (INSERT)
     * @param user 사용자 아이디
     * @param itemType 아이템 타입 - ISLAND, TREE
     * @param item 아이템 아이디
     */
    Long updateSelected(User user, ItemType itemType, Item item);

    /**
     * 사용자가 지니고 있는 아이템 중, 선택된(selected = 1)인 아이템을 반환한다.
     * @param userId 사용자 ID
     * @param itemType 아이템 유형 
     * @return 위 인자에 해당하는 Item 하나 반환
     */
    UserItem findSelectedItem(String userId, ItemType itemType);
}
