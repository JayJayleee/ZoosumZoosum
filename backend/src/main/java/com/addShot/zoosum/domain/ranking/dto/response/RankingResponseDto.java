package com.addShot.zoosum.domain.ranking.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingResponseDto {

    private String userId;
    private String nickname;
    private String region;
    private Integer score;

    @Builder
    public RankingResponseDto(String userId, String nickname, String region, Integer score) {
        this.userId = userId;
        this.nickname = nickname;
        this.region = region;
        this.score = score;
    }
}
