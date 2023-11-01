package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.CheckYN;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.enums.Region;
import com.addShot.zoosum.entity.enums.Social;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "USER")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id @Column(name = "user_id", nullable = false, updatable = false)
    private String userId;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "region", length = 10, nullable = false, columnDefinition = "VARCHAR(10)")
    private Region region;

    @Column(name = "nickname", length = 30, nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "social_type", length = 20, nullable = false, columnDefinition = "VARCHAR(10)")
    private Social socialType;

    @Embedded
    private CheckYN checkYN;

    @Embedded
    private Time time;

    public User (String userId) {
        this.userId = userId;
    }

    @Builder
    public User(String userId, String email, Region region, String nickname, Social socialType,
        CheckYN checkYN, Time time) {
        this.userId = userId;
        this.email = email;
        this.region = region;
        this.nickname = nickname;
        this.socialType = socialType;
        this.checkYN = checkYN;
        this.time = time;
    }
}
