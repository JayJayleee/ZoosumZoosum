package com.addShot.zoosum.domain.user.repository;

import com.addShot.zoosum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String>, UserCustomRepository {

}
