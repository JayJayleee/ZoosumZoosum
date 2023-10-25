package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Mission;
import com.addShot.zoosum.entity.embedded.SumPlogging;
import com.addShot.zoosum.entity.embedded.Time;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "USER_PLOG_INFO")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPlogInfo {

    @Id @OneToOne(mappedBy = "USER") // USER와 함께 조회할 일이 있으면, fetch = FetchType.LAZY 추가
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    // 플로깅 횟수
    @Column(name = "plog_count", nullable = false, columnDefinition = "int 0")
    private Integer plogCount;

    // 누적 데이터
    @Embedded
    private SumPlogging sumPloggingData;

    // 미션 데이터
    @Embedded
    private Mission mission;

    // 계산된 점수
    @Column(name = "score", nullable = false, columnDefinition = "int 0")
    private Integer score;

    // 씨앗 개수
    @Column(name = "seed", nullable = false, columnDefinition = "int 0")
    private Integer seed;

    // 시간
    @Embedded
    private Time time;

    @Builder
    public UserPlogInfo(User user, Integer plogCount, SumPlogging sumPloggingData, Mission mission,
        Integer score, Integer seed, Time time) {
        this.user = user;
        this.plogCount = plogCount;
        this.sumPloggingData = sumPloggingData;
        this.mission = mission;
        this.score = score;
        this.seed = seed;
        this.time = time;
    }
}
