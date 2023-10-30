package com.addShot.zoosum.entity.embedded;

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

    // 나무 심는 사람의 이메일
    @Column(name = "user_email", length = 100)
    private String userEmail;

    public Tree(String treeName, String userName, String userPhone, String userEmail) {
        this.treeName = treeName;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userEmail = userEmail;
    }
}
