package com.addShot.zoosum.domain.user.dto.request;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.enums.Region;
import com.addShot.zoosum.entity.enums.Social;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInfoUpdateRequestDto {

    private String nickname;
    private String region;

    public User toEntity(User user){
        user.setNickname(this.nickname);
        user.setRegion(Region.valueOf(this.region));
        return user;
    }
}
