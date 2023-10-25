package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.enums.ActivityCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "TREE")
@SuperBuilder
@NoArgsConstructor
public class Tree extends ActivityHistory {

    // 나무 이름
    @Column(name = "tree_name", length = 30, nullable = false)
    private String treeName;

    // 나무 심는 사람의 이름
    @Column(name = "user_name", length = 30, nullable = false)
    private String userName;

    // 나무 심는 사람의 전화번호
    @Column(name = "user_phone", length = 30, nullable = false)
    private String userPhone;

    // 나무 심는 사람의 이메일
    @Column(name = "user_email", length = 100, nullable = false)
    private String userEmail;

    public Tree(Long activityId, User user, ActivityCategory activityCategory, String fileUrl,
        Time time, String treeName, String userName,
        String userPhone, String userEmail) {
        super(activityId, user, activityCategory, fileUrl, time);
        this.treeName = treeName;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userEmail = userEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Tree tree = (Tree) o;
        return Objects.equals(treeName, tree.treeName) && Objects.equals(userName,
            tree.userName) && Objects.equals(userPhone, tree.userPhone)
            && Objects.equals(userEmail, tree.userEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), treeName, userName, userPhone, userEmail);
    }
}
