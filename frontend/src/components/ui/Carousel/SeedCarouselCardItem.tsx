import React, {useEffect, useRef} from 'react';
import {View, Image, Animated} from 'react-native';
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
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000, // 3초 동안
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // 0에서 1까지 변할 때, 0도에서 360도로 회전
  });

  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>
        생명의 씨앗을 {item.seedCount}개 얻었어요!
      </AppText>
      <Image
        source={require('@/assets/img_icon/seed_icon.png')}
        style={styles.seedimage}
      />
      <Animated.Image
        source={require('@/assets/img_icon/light_effect.png')}
        style={[styles.image, {transform: [{rotate: spin}]}]} // 회전 애니메이션 적용
      />
    </View>
  );
}
