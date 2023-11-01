package com.addShot.zoosum.domain.common.repository;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserBadge;
import java.util.List;

public interface UserBadgeCustomRepository {

    /**
     * 내가 갖고 있지 않은 뱃지 목록 조회
     * @param user 사용자 Entity
     * @return
     */
    List<UserBadge> findDontHaveBadge(User user);
}
