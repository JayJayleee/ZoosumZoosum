package com.addShot.zoosum.domain.activity.dto.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponseDto {

    // 활동내역 ID
    private Long activityId;

    // 사용자 ID 참조키
    private String userId;

    // 활동내역 종류
    private String activityType;

    // 파일경로
    private String fileUrl;

    // 플로깅
    private PloggingResponseDto plogging;

    // 나무
    private TreeResponseDto tree;

    // 시간
    private LocalDateTime createTime;
}
