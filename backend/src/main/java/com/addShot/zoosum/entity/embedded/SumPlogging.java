package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class SumPlogging {

    // 거리 누적
    @Column(name = "sum_length", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer sumLength;

    // 시간 누적
    @Column(name = "sum_time", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer sumTime;

    // 쓰레기 개수 누적
    @Column(name = "sum_trash", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer sumTrash;
}
