package com.addShot.zoosum.domain.item.repository;

import static com.addShot.zoosum.entity.QItem.item;

import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.util.RandomUtil;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import org.springframework.security.core.parameters.P;

public class ItemCustomRepositoryImpl implements ItemCustomRepository {

    private final JPAQueryFactory queryFactory;

    public ItemCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Item findRandomItem(ItemType itemType) {
        List<Item> itemList = queryFactory
            .selectFrom(item)
            .where(item.itemType.eq(itemType))
            .fetch();
        return RandomUtil.getRandomElement(itemList);
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
