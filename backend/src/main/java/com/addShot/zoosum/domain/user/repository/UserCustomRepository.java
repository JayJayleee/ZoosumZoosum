package com.addShot.zoosum.domain.user.repository;

import com.addShot.zoosum.entity.User;

public interface UserCustomRepository {

    User findUser(String userId);
}
