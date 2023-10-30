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
	private int sumLength;
	private int sumTime;
	private int sumTrash;

}
