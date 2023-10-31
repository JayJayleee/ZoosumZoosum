package com.addShot.zoosum.domain.user.dto.request;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.embedded.CheckYN;
import com.addShot.zoosum.entity.enums.Region;
import com.addShot.zoosum.entity.enums.Social;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoginRequestDto {
    String id;
    String email;
    String socialType;

    public User toEntity(){
        return User.builder()
            .userId(this.id)
            .email(this.email)
            .socialType(Social.valueOf(this.socialType))
//            .checkYN(new CheckYN("N","N","N"))
            .build();
    }
}
