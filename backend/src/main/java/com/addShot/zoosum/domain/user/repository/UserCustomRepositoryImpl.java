package com.addShot.zoosum.domain.user.repository;

import static com.addShot.zoosum.entity.QUser.user;

import com.addShot.zoosum.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

public class UserCustomRepositoryImpl implements UserCustomRepository {

    private final JPAQueryFactory queryFactory;

    public UserCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public User findUser(String userId) {
        return queryFactory.selectFrom(user)
            .where(user.userId.eq(userId))
            .fetchOne();
    }

    @Override
    public User findUserByNickname(String nickname){
        return queryFactory.selectFrom(user)
            .where(user.nickname.eq(nickname))
            .fetchOne();
    }

}
