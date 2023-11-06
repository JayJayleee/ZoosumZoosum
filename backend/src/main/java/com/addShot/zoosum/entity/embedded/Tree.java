package com.addShot.zoosum.entity.embedded;

import com.addShot.zoosum.domain.activity.dto.response.TreeResponseDto;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Embeddable
@NoArgsConstructor
public class Tree {

    // 나무 이름
    @Column(name = "tree_name", length = 30)
    private String treeName;

    // 나무 심는 사람의 이름
    @Column(name = "user_name", length = 30)
    private String userName;

    // 나무 심는 사람의 전화번호
    @Column(name = "user_phone", length = 30)
    private String userPhone;

    // 나무 심는 사람의 생년월일
    @Column(name = "user_birth", length = 100)
    private String userBirth;

    public Tree(String treeName, String userName, String userPhone, String userBirth) {
        this.treeName = treeName;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userBirth = userBirth;
    }

    public static TreeResponseDto toResponseDto(Tree tree) {
        return TreeResponseDto.builder()
            .treeName(tree.getTreeName())
            .userName(tree.getUserName())
            .userPhone(tree.getUserPhone())
            .userEmail(tree.getUserBirth())
            .build();
    }
}
