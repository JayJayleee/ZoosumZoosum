package com.addShot.zoosum.domain.item.repository;

import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.enums.ItemType;

public interface ItemCustomRepository {

    /**
     * 랜덤으로 아이템 데이터 하나를 가져온다.
     * @return
     */
    Item findRandomItem(ItemType itemType);

    /**
     * 아이템 이름으로 아이템을 조회한다.
     * 조회할 아이템의 이름이 없는 경우 오류발생*
     * @param itemName
     * @return
     */
    Item findItemByItemName(String itemName);
}
