package com.addShot.zoosum.domain.userinfo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreeCampaignRequest {

	private String userName;
	private String treeName;
	private String userPhone;
	private String userEmail;

}
