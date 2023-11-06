package com.addShot.zoosum.domain.ranking.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RankingResponseDto {

    private String nickname;
    private String region;
    private Integer score;
    
}
