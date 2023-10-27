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

	private String userAnimalName;
	private String description;
	private LocalDateTime createTime;
	private int trashTogether;
	private int lengthTogether;
	private int timeTogether;
	private String fileUrl;

}
