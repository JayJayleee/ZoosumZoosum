package com.addShot.zoosum.domain.item.service;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.domain.item.repository.ItemRepository;
import com.addShot.zoosum.domain.item.repository.UserItemRepository;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.enums.ItemType;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemServiceImpl implements ItemService{

    private final UserItemRepository userItemRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @Override
    public List<ItemResponseDto> itemList(String userId, String itemType) {
        List<UserItem> userItemList = userItemRepository.findAllByUserId(userId, ItemType.valueOf(itemType));
        List<ItemResponseDto> responseDtoList = new ArrayList<>();

        for (UserItem userItem : userItemList) {
            responseDtoList.add(userItem.toResponse(userItem));
        }

        return responseDtoList;
    }

    @Override
    @Transactional
    public Long itemUpdate(String userId, ItemType itemType, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow();
        Item item = itemRepository.findById(itemId).orElseThrow();

        return userItemRepository.updateSelected(user, itemType, item);
    }
}
