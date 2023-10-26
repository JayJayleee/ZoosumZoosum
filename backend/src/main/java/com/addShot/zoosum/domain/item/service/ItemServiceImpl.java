package com.addShot.zoosum.domain.item.service;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.domain.item.repository.UserItemRepository;
import com.addShot.zoosum.entity.UserItem;
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

    @Override
    public List<ItemResponseDto> itemList(String userId) {
        List<UserItem> userItemList = userItemRepository.findAllByUserId(userId);
        List<ItemResponseDto> responseDtoList = new ArrayList<>();

        for (UserItem userItem : userItemList) {
            responseDtoList.add(userItem.toResponse(userItem));
        }

        return responseDtoList;
    }
}
