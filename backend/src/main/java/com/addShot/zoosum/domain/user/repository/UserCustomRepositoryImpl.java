package com.addShot.zoosum.domain.user.repository;

import static com.addShot.zoosum.entity.QActivityHistory.activityHistory;
import static com.addShot.zoosum.entity.QUser.user;
import static com.addShot.zoosum.entity.QUserAnimal.userAnimal;
import static com.addShot.zoosum.entity.QUserBadge.userBadge;
import static com.addShot.zoosum.entity.QUserItem.userItem;
import static com.addShot.zoosum.entity.QUserPlogInfo.userPlogInfo;

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

    @Override
    public long deleteAllDataById(User userEntity) {
        // userPlogInfo delete
        queryFactory.delete(userPlogInfo).where(userPlogInfo.user.eq(userEntity)).execute();
        // activityHistory delete
        queryFactory.delete(activityHistory).where(activityHistory.user.eq(userEntity)).execute();
        // userItem delete
        queryFactory.delete(userItem).where(userItem.user.eq(userEntity)).execute();
        // userAnimal delete
        queryFactory.delete(userAnimal).where(userAnimal.user.eq(userEntity)).execute();
        // userBadge delete
        queryFactory.delete(userBadge).where(userBadge.user.eq(userEntity)).execute();
        // user delete
        long execute = queryFactory.delete(user).where(user.user.eq(userEntity)).execute();

        return execute;
    }

    @Override
    public User findUserByIdAndNickname(String userId, String nickname) {
        return queryFactory.selectFrom(user)
            .where(user.userId.eq(userId), user.nickname.eq(nickname))
            .fetchOne();
    }
}
