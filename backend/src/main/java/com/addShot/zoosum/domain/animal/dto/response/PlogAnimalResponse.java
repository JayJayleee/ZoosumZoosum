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
public class PlogAnimalResponse {

	private Long animalId;
	private String userAnimalName;
	private String description;
	private LocalDate createTime;
	private int trashTogether;
	private double lengthTogether;
	private int hour;
	private int minute;
	private int second;
	private String fileUrl;

}
