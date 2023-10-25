package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
public class Mission {

    // 거리 미션 현황
    @Column(name = "mission_length", nullable = false, columnDefinition = "int 0")
    private Integer missionLength;

    // 시간 미션 현황
    @Column(name = "mission_time", nullable = false, columnDefinition = "int 0")
    private Integer missionTime;

    // 쓰레기 미션 현황
    @Column(name = "mission_trash", nullable = false, columnDefinition = "int 0")
    private Integer missionTrash;

    public Mission(Integer missionLength, Integer missionTime, Integer missionTrash) {
        this.missionLength = missionLength;
        this.missionTime = missionTime;
        this.missionTrash = missionTrash;
    }
}
