package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.ranking.dto.response.RankingResponseDto;
import com.addShot.zoosum.entity.embedded.Mission;
import com.addShot.zoosum.entity.embedded.SumPlogging;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@Table(name = "USER_PLOG_INFO")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserPlogInfo {

    @EmbeddedId
    private UserPlogInfoId id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 플로깅 횟수
    @Column(name = "plog_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer plogCount;

    // 누적 데이터
    @Embedded
    private SumPlogging sumPloggingData;

    // 미션 데이터
    @Embedded
    private Mission mission;

    // 계산된 점수
    @Column(name = "score", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer score;

    // 씨앗 개수
    @Column(name = "seed", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer seed;

    // 알 개수
    @Column(name = "egg", nullable = false, columnDefinition = "INT DEFAULT 1")
    private Integer egg;

    // 시간
    @Embedded
    private Time time;

    public RankingResponseDto toResponse(){
        return RankingResponseDto.builder()
            .nickname(this.user.getNickname())
            .region(String.valueOf(this.user.getRegion()))
            .score(this.score)
            .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserPlogInfo that = (UserPlogInfo) o;
        return Objects.equals(id, that.id) && Objects.equals(user, that.user)
            && Objects.equals(plogCount, that.plogCount) && Objects.equals(
            sumPloggingData, that.sumPloggingData) && Objects.equals(mission, that.mission)
            && Objects.equals(score, that.score) && Objects.equals(seed, that.seed)
            && Objects.equals(egg, that.egg) && Objects.equals(time, that.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, plogCount, sumPloggingData, mission, score, seed, egg, time);
    }

    public void setSeed(int i) {
        this.seed = i;
    }
}
