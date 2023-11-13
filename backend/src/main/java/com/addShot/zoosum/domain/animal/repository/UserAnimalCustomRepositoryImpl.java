package com.addShot.zoosum.domain.animal.repository;

import static com.addShot.zoosum.entity.QAnimal.animal;
import static com.addShot.zoosum.entity.QUserAnimal.userAnimal;

import com.addShot.zoosum.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

public class UserAnimalCustomRepositoryImpl implements UserAnimalCustomRepository {

    private final JPAQueryFactory queryFactory;

    public UserAnimalCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public int doesntHaveAnimals(User user) {
        int allAnimals = queryFactory.selectFrom(animal).fetch().size();
        int userAnimals = queryFactory.selectFrom(userAnimal).where(userAnimal.user.eq(user)).fetch()
            .size();

        return allAnimals - userAnimals;
    }
}
