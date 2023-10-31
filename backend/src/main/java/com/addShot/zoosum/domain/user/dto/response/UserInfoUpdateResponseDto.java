package com.addShot.zoosum.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoUpdateResponseDto {

    private String nickname;
    private String region;
}
