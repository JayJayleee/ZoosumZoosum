package com.addShot.zoosum.domain.activity.dto.request;

import com.addShot.zoosum.entity.ActivityHistory;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.embedded.Plogging;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.enums.ActivityType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequestDto {

    // 플로깅 거리(m)
    private Integer length;
    
    // 플로깅 시간(s)
    private Integer time;
    
    // 주운 쓰레기 개수
    private Integer trash;

    public static ActivityHistory toEntity(String userId, String fileUrl, ActivityRequestDto activityRequestDto) {
        Plogging plogging = Plogging.toEntity(activityRequestDto);
        return ActivityHistory.builder()
            .user(new User(userId))
            .activityType(ActivityType.PLOG)
            .fileUrl(fileUrl)
            .plogging(plogging)
            .time(new Time(LocalDateTime.now(), LocalDateTime.now()))
            .build();
    }
}
