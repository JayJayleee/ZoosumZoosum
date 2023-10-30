package com.addShot.zoosum.domain.item.repository;

import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.embedded.UserItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserItemRepository extends JpaRepository<UserItem, UserItemId>, UserItemCustomRepository {

    UserItem findByUserIdAndItemId(UserItemId userItemId);
}
