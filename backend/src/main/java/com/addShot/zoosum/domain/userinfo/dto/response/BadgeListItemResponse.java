package com.addShot.zoosum.domain.userinfo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BadgeListItemResponse {

	private String badgeId;
	private String userId;
	private String badgeName;
	private String fileUrl;
	private boolean isHave;

}
