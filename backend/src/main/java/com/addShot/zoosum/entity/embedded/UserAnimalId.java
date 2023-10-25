package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

//유저-동물 복합키 클래스
@Embeddable
public class UserAnimalId implements Serializable {

	private String userId;
	private Long animalId;

}
