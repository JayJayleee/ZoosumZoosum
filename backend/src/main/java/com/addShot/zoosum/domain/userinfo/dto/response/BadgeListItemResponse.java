package com.addShot.zoosum.domain.userinfo.dto.response;

import java.time.LocalDateTime;
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
	private String badgeName;
	private String fileUrl;
	private boolean isHave;
	private String badgeCondition;
	private LocalDateTime updateTime;

}
