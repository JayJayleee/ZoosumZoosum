package com.addShot.zoosum.domain.animal.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyAnimalRequest {

	private Long animalId;
	private String userAnimalName;

}
