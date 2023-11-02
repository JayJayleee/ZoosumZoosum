import React from 'react';
import {View, Image} from 'react-native';
import AppText from '../Text';
import styles from './styles';
import {ShiningEffect} from './ShiningEffect';
import {SeedCarouselCardItemProps} from '@/apis/plogging';
// 뱃지, 아이템 등에 대한 캐롯셀 아이템

export function SeedCarouselCardItem({item, index}: SeedCarouselCardItemProps) {
  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>
        생명의 씨앗 {item.addSeed}개 획득!
      </AppText>

      <Image
        source={require('@/assets/img_icon/seed_icon.png')}
        style={styles.seedimage}
      />

      <ShiningEffect />
    </View>
  );
}
