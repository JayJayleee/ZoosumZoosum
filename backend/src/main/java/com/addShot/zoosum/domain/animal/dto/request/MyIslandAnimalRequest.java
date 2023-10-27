package com.addShot.zoosum.domain.animal.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyIslandAnimalRequest {

	List<Long> animalIdList;

}
