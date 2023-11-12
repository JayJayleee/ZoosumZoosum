package com.addShot.zoosum.domain.item.repository;

import static com.addShot.zoosum.entity.QItem.item;
import static com.addShot.zoosum.entity.QUserItem.userItem;

import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.util.RandomUtil;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;

@Slf4j
public class ItemCustomRepositoryImpl implements ItemCustomRepository {

    private final JPAQueryFactory queryFactory;

    public ItemCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Item findRandomItem(User user, ItemType itemType) {

        List<Long> ownedItems = queryFactory
            .select(userItem.item.itemId)
            .from(userItem)
            .where(userItem.user.eq(user)
                .and(userItem.item.itemType.eq(itemType)))
            .fetch();

        // 중복 제거(전체 - 소유)
        List<Item> allItems = queryFactory
            .selectFrom(item)
            .where(item.itemType.eq(itemType)
                .and(item.itemId.notIn(ownedItems))) // where not in 으로 중복제거
            .fetch();

        // log.info("중복 제거 후, ItemCustomRepositoryImpl, allItems : {}, ownedItems : {}", allItems, ownedItems);

        return RandomUtil.getRandomElement(allItems);
    }

    @Override
    public Item findItemByItemName(String itemName) {
        List<Item> itemList = queryFactory
            .selectFrom(item)
            .where(item.itemName.eq(itemName))
            .fetch();

        if(itemList.isEmpty()){
//            throw new Exception();
        }

        Item getItem = itemList.get(0);
        return getItem;
    }
}
