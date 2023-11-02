import React from 'react';
import {View, Image} from 'react-native';
import AppText from '../Text';
import {ShiningEffect} from './ShiningEffect';
import {CarouselCardItemProps} from '@/apis/plogging';

import styles from './styles';

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
