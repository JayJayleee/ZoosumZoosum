package com.addShot.zoosum.domain.activity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeResponseDto {

    // 나무 이름
    private String treeName;

    // 나무 심는 사람의 이름
    private String userName;

    // 나무 심는 사람의 전화번호
    private String userPhone;

    // 나무 심는 사람의 이메일
    private String userEmail;

}
