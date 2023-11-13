package com.addShot.zoosum.domain.activity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PloggingResponseDto {

    // 플로깅 거리(m)
    private Integer ploggingLength;

    // 플로깅 시간(s)
    private Integer ploggingTime;

    // 플로깅 쓰레기 개수
    private Integer ploggingTrash;

}
