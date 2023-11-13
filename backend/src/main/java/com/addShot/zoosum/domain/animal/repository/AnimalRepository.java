package com.addShot.zoosum.domain.animal.repository;

import com.addShot.zoosum.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long>, AnimalCustomRepository {

}
