package com.addShot.zoosum.entity.embedded;

import com.addShot.zoosum.domain.activity.dto.request.ActivityRequestDto;
import com.addShot.zoosum.domain.activity.dto.response.PloggingResponseDto;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Embeddable
@NoArgsConstructor
public class Plogging {

    // 플로깅 거리(m)
    @Column(name = "plogging_length", columnDefinition = "INT DEFAULT 0")
    private Integer ploggingLength;

    // 플로깅 시간(s)
    @Column(name = "plogging_time", columnDefinition = "INT DEFAULT 0")
    private Integer ploggingTime;

    // 플로깅 쓰레기 개수
    @Column(name = "plogging_trash", columnDefinition = "INT DEFAULT 0")
    private Integer ploggingTrash;

    public Plogging(Integer ploggingLength, Integer ploggingTime, Integer ploggingTrash) {
        this.ploggingLength = ploggingLength;
        this.ploggingTime = ploggingTime;
        this.ploggingTrash = ploggingTrash;
    }

    public static Plogging toEntity(ActivityRequestDto activityRequestDto) {
        return Plogging.builder()
            .ploggingLength(activityRequestDto.getLength())
            .ploggingTime(activityRequestDto.getTime())
            .ploggingTrash(activityRequestDto.getTrash())
            .build();
    }

    public static PloggingResponseDto toResponseDto(Plogging plogging) {
        return PloggingResponseDto.builder()
            .ploggingLength(plogging.getPloggingLength())
            .ploggingTime(plogging.getPloggingTime())
            .ploggingTrash(plogging.getPloggingTrash())
            .build();
    }
}
