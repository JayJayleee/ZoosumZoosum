package com.addShot.zoosum.domain.animal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalDrawResponse {

	private Long animalId;
	private String animalName;
	private String fileUrl;

}
