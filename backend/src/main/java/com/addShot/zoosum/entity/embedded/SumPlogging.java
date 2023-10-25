package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
public class SumPlogging {

    // 거리 누적
    @Column(name = "sum_length", nullable = false, columnDefinition = "int 0")
    private Integer sumLength;

    // 시간 누적
    @Column(name = "sum_time", nullable = false, columnDefinition = "int 0")
    private Integer sumTime;

    // 쓰레기 개수 누적
    @Column(name = "sum_trash", nullable = false, columnDefinition = "int 0")
    private Integer sumTrash;

    public SumPlogging(Integer sumLength, Integer sumTime, Integer sumTrash) {
        this.sumLength = sumLength;
        this.sumTime = sumTime;
        this.sumTrash = sumTrash;
    }
}
