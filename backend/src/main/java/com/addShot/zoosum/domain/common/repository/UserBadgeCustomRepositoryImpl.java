package com.addShot.zoosum.domain.common.repository;

import static com.addShot.zoosum.entity.QBadge.badge;
import static com.addShot.zoosum.entity.QUserBadge.userBadge;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserBadge;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class UserBadgeCustomRepositoryImpl implements UserBadgeCustomRepository {

    private final JPAQueryFactory queryFactory;

    public UserBadgeCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<UserBadge> findDontHaveBadge(User user) {
        return queryFactory
            .selectFrom(userBadge)
            .join(userBadge.badge, badge).fetchJoin()
            .where(userBadge.user.eq(user)
                .and(userBadge.badgeGet.eq(false)))
            .fetch();
    }
}
