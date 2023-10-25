package com.addShot.zoosum.domain.animal.repository;

import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.entity.embedded.UserAnimalId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserAnimalRepository extends JpaRepository<UserAnimal, UserAnimalId> {
	
	@Query("select ua from UserAnimal ua where ua.id =:userId")
	Optional<List<UserAnimal>> selectByUserId(@Param("userId") String userid);
	//유저 id로 유저 동물 전체 리스트 조회


	//유저 id와 동물 id로 동물 상세 조회

}
