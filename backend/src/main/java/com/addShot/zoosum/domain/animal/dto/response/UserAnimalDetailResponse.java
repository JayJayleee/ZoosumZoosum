package com.addShot.zoosum.domain.animal.dto.response;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnimalDetailResponse {

	private String userAnimalName;
	private String description;
	private LocalDate createTime;
	private int trashTogether;
	private int timeTogether;
	private int lengthTogether;
	private String fileUrl;

}
