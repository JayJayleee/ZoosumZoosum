import React, {useEffect, useRef} from 'react';
import {View, Image, Animated, Easing} from 'react-native';
import AppText from '../Text';
import {ShiningEffect} from './ShiningEffect';

import styles from './styles';
interface CarouselCardItemProps {
  item: {
    fileUrl: string;
    badgeName: string;
  };
  index: number;
  activeIndex?: number;
}

// 뱃지, 아이템 등에 대한 캐롯셀 아이템

export function BadgeCarouselCardItem({item, index}: CarouselCardItemProps) {
  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>뱃지를 얻었어요!</AppText>
      <Image source={{uri: item.fileUrl}} style={styles.badgeimage} />
      <ShiningEffect />
      <AppText style={styles.body}>{item.badgeName}</AppText>
    </View>
  );
}
