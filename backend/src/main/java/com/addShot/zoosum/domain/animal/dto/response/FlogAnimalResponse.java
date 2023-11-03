package com.addShot.zoosum.domain.animal.dto.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlogAnimalResponse {

	private Long animalId;
	private String userAnimalName;
	private String description;
	private LocalDateTime createTime;
	private int trashTogether;
	private double lengthTogether;
	private int hour;
	private int minute;
	private int second;
	private String fileUrl;

}
