package com.addShot.zoosum.domain.item.repository;

import static com.addShot.zoosum.entity.QItem.item;
import static com.addShot.zoosum.entity.QUserItem.userItem;
import static com.addShot.zoosum.entity.QUserSelectItem.userSelectItem;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.enums.ItemType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
    public Long updateSelected(User user, ItemType itemType, Item item) {
        log.info("UserItemCustomRepositoryImpl userId : {}, itemType : {}, itemId : {}", user.getUserId(), itemType, item.getItmeId());

        // itemId가 아닌 것의 selected를 false로 변경
        long changeFalse = queryFactory.update(userItem)
            .set(userItem.selected, false)
            .set(userItem.time.updateTime, LocalDateTime.now())
            .where(userItem.user.eq(user)
                .and(userItem.item.ne(item)))
            .execute();

        // itemId인 selected를 true로 변경
        long changeTrue = queryFactory.update(userItem)
            .set(userItem.selected, true)
            .set(userItem.time.updateTime, LocalDateTime.now())
            .where(userItem.user.eq(user)
                .and(userItem.item.eq(item)))
            .execute();

        /*
        // 이전 데이터 삭제
        long deleted = queryFactory.delete(userSelectItem)
            .where(userSelectItem.user.eq(user)
                .and(userSelectItem.item.itemType.eq(itemType)) // 같은 itemType만 삭제
                .and(userSelectItem.item.ne(item)))
            .execute();

        // 새로운 데이터 삽입
        long inserted = queryFactory.insert(userSelectItem)
            .set(userSelectItem.user.userId, user.getUserId())
            .set(userSelectItem.item.itmeId, item.getItmeId())
            .execute();
         */

        if (changeTrue > 0 && changeFalse > 0
//            && deleted > 0 && inserted > 0
        )
            return changeTrue;
        else
            return 0L;
    }

    @Override
    public ItemResponseDto findSelectedItem(String userId, ItemType itemType) {
        UserItem result = queryFactory.selectFrom(userItem)
            .join(userItem.item, item).fetchJoin()
            .where(userItem.user.userId.eq(userId)
                .and(userItem.selected.eq(true))
                .and(item.itemType.eq(itemType)))
            .orderBy(userItem.time.createTime.asc())
            .fetchOne();

        return result.toResponse(result);
    }
}
