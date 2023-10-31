package com.addShot.zoosum.domain.animal.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnimalDetailResponse {

	private Long animalId;
	private String userAnimalName;
	private String description;
	private LocalDateTime createTime;
	private int trashTogether;
	private int timeTogether;
	private int lengthTogether;
	private String fileUrl;

}
