package com.addShot.zoosum.domain.common.repository;

import com.addShot.zoosum.entity.UserBadge;
import com.addShot.zoosum.entity.embedded.UserBadgeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBadgeRepository extends JpaRepository<UserBadge, UserBadgeId> {

}
