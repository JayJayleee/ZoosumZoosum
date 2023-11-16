import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import AppText from '../Text';
import styles from './styles';
import {ShiningEffect} from './ShiningEffect';
import {EggCarouselCardItemProps} from '@/types/plogging';
import {changeEggRewardSound} from '@/constants/sound';

// 뱃지, 아이템 등에 대한 캐롯셀 아이템

export function EggCarouselCardItem({
  item,
  index,
  activeIndex,
}: EggCarouselCardItemProps) {
  useEffect(() => {
    if (activeIndex === index) {
      changeEggRewardSound();
      console.log(activeIndex, '=', index);
    }
  }, [index, activeIndex]);
  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>
        정령의 알을 {item?.addEgg}개 찾았어요!
      </AppText>

      <Image
        source={require('@/assets/img_icon/egg.png')}
        style={styles.Eggimage}
      />

      <ShiningEffect style={{width: '100%'}} />
    </View>
  );
}
