package com.addShot.zoosum.domain.item.repository;

import static com.addShot.zoosum.entity.QItem.item;
import static com.addShot.zoosum.entity.QUserItem.userItem;
import static com.addShot.zoosum.entity.QUserSelectItem.userSelectItem;

import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.enums.ItemType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAInsertClause;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public class UserItemCustomRepositoryImpl implements UserItemCustomRepository {

    private final JPAQueryFactory queryFactory;

    public UserItemCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<UserItem> findAllByUserId(String userId, ItemType itemType) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(userItem.time.deleteTime.isNull());
        builder.and(userItem.user.userId.eq(userId));

        if (itemType != null) {
            builder.and(userItem.item.itemType.eq(itemType));
        }

        return queryFactory.selectFrom(userItem)
            .join(userItem.item, item).fetchJoin()
            .where(builder)
            .orderBy(userItem.time.createTime.asc()) // 먼저 획득한 아이템이 위로 가도록 정렬
            .fetch();
    }

    @Override
    public Long updateSelected(String userId, ItemType itemType, Long itemId) {
        // itemId가 아닌 것의 selected를 false로 변경
        queryFactory.update(userItem)
            .set(userItem.selected, false)
            .set(userItem.time.updateTime, LocalDateTime.now())
            .where(userItem.user.userId.eq(userId)
                .and(userItem.item.itmeId.ne(itemId)));

        // itemId인 selected를 true로 변경
        queryFactory.update(userItem)
            .set(userItem.selected, true)
            .set(userItem.time.updateTime, LocalDateTime.now())
            .where(userItem.user.userId.eq(userId)
                .and(userItem.item.itmeId.eq(itemId)));

        // 이전 데이터 삭제
        queryFactory.delete(userSelectItem)
            .where(userItem.user.userId.eq(userId)
                .and(userItem.item.itemType.eq(itemType)) // 같은 itemType만 삭제
                .and(userItem.item.itmeId.ne(itemId)));

        // 새로운 데이터 삽입
        long execute = queryFactory.insert(userSelectItem)
            .set(userItem.user.userId, userId)
            .set(userItem.item.itmeId, itemId)
            .execute();

        return execute;
    }
}
