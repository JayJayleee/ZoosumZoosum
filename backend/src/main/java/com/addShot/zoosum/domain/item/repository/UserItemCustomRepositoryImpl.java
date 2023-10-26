package com.addShot.zoosum.domain.item.repository;

import static com.addShot.zoosum.entity.QItem.item;
import static com.addShot.zoosum.entity.QUserItem.userItem;

import com.addShot.zoosum.entity.UserItem;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class UserItemCustomRepositoryImpl implements UserItemCustomRepository {

    private final JPAQueryFactory queryFactory;

    public UserItemCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<UserItem> findAllByUserId(String userId) {
        return queryFactory.selectFrom(userItem)
            .join(userItem.item, item).fetchJoin()
            .where(userItem.user.userId.eq(userId))
            .orderBy(userItem.time.createTime.asc())
            .fetch();
    }
}
