package com.addShot.zoosum.domain.activity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissionResponseDto {

    // 거리 미션 현황
    private Float missionLength;
    // 시간 미션 현황
    private Float missionTime;
    // 쓰레기 미션 현황
    private Float missionTrash;

}
