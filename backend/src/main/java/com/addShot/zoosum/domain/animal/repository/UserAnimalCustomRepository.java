package com.addShot.zoosum.domain.animal.repository;

import com.addShot.zoosum.entity.User;

public interface UserAnimalCustomRepository {

    /**
     * 사용자가 지니지 못한 동물 수 계산
     * @param user 사용자 Entity
     * @return 지니지 못한 동물 수
     */
    int doesntHaveAnimals(User user);
}
