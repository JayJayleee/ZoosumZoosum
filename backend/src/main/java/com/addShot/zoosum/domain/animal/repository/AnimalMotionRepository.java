package com.addShot.zoosum.domain.animal.repository;

import com.addShot.zoosum.entity.AnimalMotion;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnimalMotionRepository extends JpaRepository<AnimalMotion, Long> {

	//동물 id와 모션 종류(가만히 있기)로 동물 모션 조회
	@Query("select am from AnimalMotion am where am.animal.animalId =:animalId and am.motionCategory = 'idle'")
	Optional<AnimalMotion> selectAnimalMotion(@Param("animalId") Long animalId);

	//동물 id로 동물 모션 조회
	@Query("select am from AnimalMotion am where am.animal.animalId =:animalId")
	Optional<AnimalMotion> findByAnimalId(@Param("animalId") Long animalId);


}
