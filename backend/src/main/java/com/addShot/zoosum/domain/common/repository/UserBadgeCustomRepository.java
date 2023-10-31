package com.addShot.zoosum.domain.common.repository;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserBadge;
import java.util.List;

public interface UserBadgeCustomRepository {

    List<UserBadge> findDontHaveBadge(User user);
}
