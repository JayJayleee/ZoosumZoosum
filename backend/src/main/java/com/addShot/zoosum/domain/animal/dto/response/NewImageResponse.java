package com.addShot.zoosum.domain.animal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewImageResponse {

	private Long animalId;
	private String fileUrl;

}
