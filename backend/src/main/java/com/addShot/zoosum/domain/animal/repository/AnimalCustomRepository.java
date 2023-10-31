package com.addShot.zoosum.domain.animal.repository;

import com.addShot.zoosum.entity.Animal;

public interface AnimalCustomRepository {

    /**
     * 랜덤으로 동물 데이터 하나를 가져온다.
     * @return
     */
    Animal findRandomAnimal();
}
