package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Embeddable
@NoArgsConstructor
public class CheckYN {

    // 카메라 동의 여부
    @Column(name = "camera_yn", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String cameraYn;

    // GPS 동의 여부
    @Column(name = "gps_yn", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String gpsYn;

    // 튜토리얼 진행 여부
    @Column(name = "tutorial_yn", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String tutorialYn;

    public CheckYN(String cameraYn, String gpsYn, String tutorialYn) {
        this.cameraYn = cameraYn;
        this.gpsYn = gpsYn;
        this.tutorialYn = tutorialYn;
    }
}
