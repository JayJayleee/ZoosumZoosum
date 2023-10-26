package com.addShot.zoosum.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
public class Time {

    // data 생성일
    @Column(name = "create_time", nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP()")
    private LocalDateTime createTime;

    // data 수정일
    @Column(name = "update_time", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP()")
    private LocalDateTime updateTime;

    // data 삭제일
    @Column(name = "delete_time")
    private LocalDateTime deleteTime;

    public Time(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public Time(LocalDateTime createTime, LocalDateTime updateTime) {
        this(updateTime);
        this.createTime = createTime;
    }

    public Time(LocalDateTime createTime, LocalDateTime updateTime, LocalDateTime deleteTime) {
        this(createTime, updateTime);
        this.deleteTime = deleteTime;
    }
}
