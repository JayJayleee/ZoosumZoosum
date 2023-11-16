import React from 'react';
import {View} from 'react-native';
import AppText from '../Text';
import AnimatedProgressCircle from './CircleProgress';
import styles from './styles';
import {ProgressCarouselCardItemProps} from '@/types/plogging';
import {changeProgressSound} from '@/constants/sound';
// 플로깅 모든 통계에 대한 캐롯셀 아이템

export function ProgressCarouselCardItem({
  item,
  index,
  activeIndex,
}: ProgressCarouselCardItemProps) {
  if (activeIndex === index) {
    changeProgressSound();
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.progressHeader}>
        조금만 더하면{'\n'}받을 수 있어요!
      </AppText>
      <View style={styles.progressContainer}>
        <AnimatedProgressCircle
          progress={item.missionTrash}
          children={require('@/assets/img_icon/egg.png')}
        />
        <AppText style={styles.body}>
          {item.missionTrash >= 1
            ? '리워드 획득!'
            : `쓰레기 ${10 - item.missionTrash * 10}개 더!`}
        </AppText>
      </View>
      <View style={styles.doubleprogressContainer}>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle
            progress={item.missionLength}
            children={require('@/assets/img_icon/island_icon.png')}
          />
          <AppText style={styles.body}>
            {item.missionLength >= 1
              ? '리워드 획득!'
              : `${Math.round((1 - item.missionLength) * 500)} m 더!`}
          </AppText>
        </View>
        <View style={styles.progressContainer}>
          <AnimatedProgressCircle
            progress={item.missionTime}
            children={require('@/assets/img_icon/tree_img.png')}
          />
          <AppText style={styles.body}>
            {item.missionTime >= 1
              ? '리워드 획득!'
              : `${Math.round((1 - item.missionTime) * 5)}분 더!`}
          </AppText>
        </View>
      </View>
    </View>
  );
}
