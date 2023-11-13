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
      <AppText style={styles.progressHeader}>
        조금만 더하면 받을 수 있어요!
      </AppText>
      <View style={styles.progressContainer}>
        <AnimatedProgressCircle
          progress={item.missionTrash}
          children={require('@/assets/img_icon/egg.png')}
        />
        <AppText style={styles.body}>
          쓰레기 {100 - item.missionTrash * 100}개 더!
        </AppText>
      </View>
      <View style={styles.doubleprogressContainer}>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle
            progress={item.missionLength}
            children={require('@/assets/img_icon/island_icon.png')}
          />
          <AppText style={styles.body}>
            {Math.round((1 - item.missionLength) * 10)} km 더!
          </AppText>
        </View>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle
            progress={item.missionTime}
            children={require('@/assets/img_icon/tree_img.png')}
          />
          <AppText style={styles.body}>
            {Math.round((1 - item.missionTime) * 100)}분 더!
          </AppText>
        </View>
      </View>
    </View>
  );
}
