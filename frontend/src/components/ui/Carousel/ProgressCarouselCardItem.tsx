import React from 'react';
import {View, Text, Image} from 'react-native';
import AnimatedProgressCircle from './CircleProgress';
import styles from './styles';
interface ProgressCarouselCardItemProps {
  item: {
    missonTrashLimit: number;
    missonLengthLimit: number;
    missonTimeLimit: number;
    missonTrash: number;
    missonLength: number;
    missonTime: number;
  };
  index: number;
  activeIndex?: number;
}

// 플로깅 모든 통계에 대한 캐롯셀 아이템

export function ProgressCarouselCardItem({
  item,
  index,
}: ProgressCarouselCardItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.progressHeader}>오늘의 플로깅 결과는?!</Text>
      <View style={styles.progressContainer}>
        <AnimatedProgressCircle progress={0.75} />
        <Text style={styles.body}>짜란</Text>
      </View>
      <View style={styles.doubleprogressContainer}>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle progress={0.85} />
          <Text style={styles.body}>짜란</Text>
        </View>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle progress={0.75} />
          <Text style={styles.body}>짜란</Text>
        </View>
      </View>
    </View>
  );
}
