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

	private double missionLength;
	private int hour;
	private int minute;
	private int second;
	private int missionTrash;
	private int seed;
	private int treeAllCount;
	private int treeCount;
	private int egg;

}
