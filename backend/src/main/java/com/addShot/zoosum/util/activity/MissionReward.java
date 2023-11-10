package com.addShot.zoosum.util.activity;

import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.Item;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionReward {

    // 섬 목록
    private List<Item> islandList = new ArrayList<>();
    
    // 나무 목록
    private List<Item> treeList = new ArrayList<>();

}
