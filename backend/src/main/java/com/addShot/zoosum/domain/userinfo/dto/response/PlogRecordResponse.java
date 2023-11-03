package com.addShot.zoosum.domain.userinfo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlogRecordResponse {

	private int plogCount;
	private double sumLength;
	private int hour;
	private int minute;
	private int second;
	private int sumTrash;
	private String nickname;

}
