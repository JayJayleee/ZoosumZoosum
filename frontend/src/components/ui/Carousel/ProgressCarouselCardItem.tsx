import React from 'react';
import {View} from 'react-native';
import AppText from '../Text';
import AnimatedProgressCircle from './CircleProgress';
import styles from './styles';
import {ProgressCarouselCardItemProps} from '@/types/plogging';

// 플로깅 모든 통계에 대한 캐롯셀 아이템

export function ProgressCarouselCardItem({
  item,
  index,
}: ProgressCarouselCardItemProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.progressHeader}>오늘의 플로깅 결과는?!</AppText>
      <View style={styles.progressContainer}>
        <AnimatedProgressCircle progress={1.2} />
        <AppText style={styles.body}>쓰레기 수</AppText>
      </View>
      <View style={styles.doubleprogressContainer}>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle progress={0.85} />
          <AppText style={styles.body}>걸음 수</AppText>
        </View>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle progress={0.75} />
          <AppText style={styles.body}>걸은 시간</AppText>
        </View>
      </View>
    </View>
  );
}
