package com.addShot.zoosum.domain.item.repository;

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
}
