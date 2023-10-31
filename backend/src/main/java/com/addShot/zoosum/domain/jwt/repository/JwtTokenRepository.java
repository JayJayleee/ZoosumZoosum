package com.addShot.zoosum.domain.jwt.repository;

import com.addShot.zoosum.entity.JwtToken;
import org.springframework.data.repository.CrudRepository;

public interface JwtTokenRepository extends CrudRepository<JwtToken, String> {

}
