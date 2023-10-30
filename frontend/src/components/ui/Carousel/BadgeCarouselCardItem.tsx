import React from 'react';
import {View, Text, Image} from 'react-native';

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
      <Text style={styles.header}>뱃지를 얻었어요!</Text>
      <Image source={{uri: item.fileUrl}} style={styles.image} />
      <Text style={styles.body}>{item.badgeName}</Text>
    </View>
  );
}
