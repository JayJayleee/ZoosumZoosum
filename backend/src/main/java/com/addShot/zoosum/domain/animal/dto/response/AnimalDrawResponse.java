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

	// 동물 ID
	private Long animalId;
	// 동물 이름
	private String animalName;
	// 동물 설명
	private String description;
	// 동물 이미지 URL
	private String fileUrl;

}
