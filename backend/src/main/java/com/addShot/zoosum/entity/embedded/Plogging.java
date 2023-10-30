package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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
}
