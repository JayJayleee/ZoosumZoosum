import React from 'react';
import {View, Image} from 'react-native';
import AppText from '../Text';
import styles from './styles';
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
      <Image
        source={require('@/assets/img_icon/light_effect.png')}
        style={styles.image}
      />
    </View>
  );
}
