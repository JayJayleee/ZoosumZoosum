package com.addShot.zoosum.domain.item.repository;

import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.enums.ItemType;

public interface ItemCustomRepository {

    /**
     * 랜덤으로 아이템 데이터 하나를 가져온다.
     * @return
     */
    Item findRandomItem(ItemType itemType);
}
