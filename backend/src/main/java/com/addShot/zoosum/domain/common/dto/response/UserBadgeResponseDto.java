package com.addShot.zoosum.domain.common.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBadgeResponseDto {

    // 뱃지 ID
    private String badgeId;
    // 뱃지명
    private String badgeName;
    // 뱃지 획득 조건
    private String badgeCondition;
    // 뱃지 이미지 경로
    private String fileUrl;

}
