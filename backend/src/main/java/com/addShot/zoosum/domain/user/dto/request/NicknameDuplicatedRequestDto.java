package com.addShot.zoosum.domain.user.dto.request;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.enums.Region;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NicknameDuplicatedRequestDto {

    private String nickname;
}
