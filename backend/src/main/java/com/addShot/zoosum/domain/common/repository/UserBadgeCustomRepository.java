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

    /**
     * 사용자의 뱃지 현황 조회
     *  - 갖고있으면 badge_get 1
     *  - 없으면 badge_get 0
     * @param user 사용자 Entity
     * @return
     */
    List<UserBadge> findBadgeByUserId(User user);
}
