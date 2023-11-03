package com.addShot.zoosum.domain.animal.repository;

import static com.addShot.zoosum.entity.QAnimal.animal;
import static com.addShot.zoosum.entity.QAnimalMotion.animalMotion;

import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.enums.MotionCategory;
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
    public AnimalMotion findRandomAnimal() {
        List<AnimalMotion> animalList = queryFactory
            .selectFrom(animalMotion)
            .join(animalMotion.animal, animal).fetchJoin()
            .where(animalMotion.motionCategory.eq(MotionCategory.IDLE))
            .fetch();
        return RandomUtil.getRandomElement(animalList);
    }

    @Override
    public Animal findAnimalByAnimalName(String animalName) {
        List<Animal> animalList = queryFactory
            .selectFrom(animal)
            .where(animal.animalName.eq(animalName))
            .fetch();

        if(animalList.isEmpty()){
//            throw new Exception();
        }

        Animal getAnimal = animalList.get(0);
        return getAnimal;
    }
}
