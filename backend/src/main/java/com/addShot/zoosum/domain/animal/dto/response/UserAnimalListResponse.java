package com.addShot.zoosum.domain.animal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnimalListResponse {

	private String animalName;
	private String fileUrl;
	private boolean selected;

}
