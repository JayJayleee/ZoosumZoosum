import React, {useEffect, useRef} from 'react';
import {View, Image, Animated, Easing} from 'react-native';
import AppText from '../Text';
import styles from './styles';
import {ShiningEffect} from './ShiningEffect';

interface CarouselCardItemProps {
  item: {
    totalRewardCount: number;
    badgeRewardCount: string;
    itemRewardCount: number;
    animalRewardCount: number;
    seedCount: number;
  };
  index: number;
  activeIndex?: number;
}

// 뱃지, 아이템 등에 대한 캐롯셀 아이템

export function SeedCarouselCardItem({item, index}: CarouselCardItemProps) {
  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>
        생명의 씨앗을 {item.seedCount}개 얻었어요!
      </AppText>
      <Image
        source={require('@/assets/img_icon/seed_icon.png')}
        style={styles.seedimage}
      />

      <ShiningEffect />
    </View>
  );
}
