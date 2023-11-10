package com.addShot.zoosum.domain.activity.dto.response;

import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.common.dto.response.UserBadgeResponseDto;
import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRewardResponseDto {

    // 미션 점수 목록
    private List<MissionResponseDto> missionList;
    // 섬 보상 목록
    private List<ItemResponseDto> islandList;
    // 나무 보상 목록
    private List<ItemResponseDto> treeList;
    // 추가 씨앗
    private List<SeedResponseDto> seedList;
    // 추가 점수
    private List<ScoreResponseDto> scoreList;
    // 추가 알
    private List<EggResponseDto> eggList;
    // 뱃지 보상 목록
    private List<UserBadgeResponseDto> userBadgeList;

}
