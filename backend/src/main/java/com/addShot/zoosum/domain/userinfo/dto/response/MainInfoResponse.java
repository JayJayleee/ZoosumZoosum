package com.addShot.zoosum.domain.userinfo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainInfoResponse {

	private String userId;
	private int missionLength;
	private int missionTime;
	private int missionTrash;
	private int seed;
	private int treeAllCount;
	private int treeCount;

}
