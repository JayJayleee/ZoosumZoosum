package com.addShot.zoosum.domain.item.repository;

import com.addShot.zoosum.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemCustomRepository {

}
