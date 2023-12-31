package com.addShot.zoosum.domain.userinfo.dto.response;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainResponse {

	private String islandUrl;
	private String treeUrl;
	private List<SelectedAnimalResponse> animalList;

}
