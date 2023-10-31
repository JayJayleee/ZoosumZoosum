package com.addShot.zoosum.domain.animal.repository;

import static com.addShot.zoosum.entity.QAnimal.animal;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.util.RandomUtil;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class AnimalCustomRepositoryImpl implements AnimalCustomRepository {

    private final JPAQueryFactory queryFactory;

    public AnimalCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Animal findRandomAnimal() {
        List<Animal> animalList = queryFactory
            .selectFrom(animal)
            .fetch();
        return RandomUtil.getRandomElement(animalList);
    }
}
