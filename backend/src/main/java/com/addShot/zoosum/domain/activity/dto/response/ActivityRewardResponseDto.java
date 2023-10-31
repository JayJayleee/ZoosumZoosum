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

    // 거리 미션 현황
    private Integer missionLength;
    // 시간 미션 현황
    private Integer missionTime;
    // 쓰레기 미션 현황
    private Integer missionTrash;
    // 섬 보상 목록
    private List<ItemResponseDto> islandList;
    // 나무 보상 목록
    private List<ItemResponseDto> treeList;
    // 동물 보상 목록
    private List<AnimalDrawResponse> animalList;
    // 추가 씨앗
    private Integer addSeed;
    // 전체 씨앗
    private Integer totalSeed;
    // 추가 점수
    private Integer addScore;
    // 총 점수
    private Integer totalScore;
    // 뱃지 보상 목록
    private List<UserBadgeResponseDto> userBadgeList;

}
