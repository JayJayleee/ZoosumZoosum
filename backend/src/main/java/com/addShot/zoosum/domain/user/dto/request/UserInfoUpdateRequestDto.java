package com.addShot.zoosum.domain.user.dto.request;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.enums.Region;
import com.addShot.zoosum.entity.enums.Social;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoUpdateRequestDto {

    private String nickname;
    private String region;

    public User toEntity(User user){
        user.setNickname(this.nickname);
        user.setRegion(Region.valueOf(this.region));
        return user;
    }
}
