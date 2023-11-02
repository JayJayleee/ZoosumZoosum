package com.addShot.zoosum.domain.user.repository;

import com.addShot.zoosum.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("select u from User u where u.nickname = :nickname")
    Optional<User> findByNickname(@Param("nickname") String nickname);
    //닉네임 중복 검사, 닉네임 검색, 남 집 조회
}
