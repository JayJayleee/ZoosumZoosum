import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { PickIslandScreenProps } from 'typePath';
import styles from './style';
import AppText from '@/components/ui/Text';
import PickIslandCardList from './PickIslandCardList';


export default function PickIslandPage({ navigation }: PickIslandScreenProps) {
  
  const propsFtn = () => {
    navigation.navigate('Main')
  }
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}
    >
      <View style={styles.backgroungcolor}></View>
      <View style={styles.container}>
        <View style={styles.head}>
          <AppText style={styles.title_head}>나만의 섬을</AppText>
          <AppText style={styles.title_head}>선택하세요</AppText>
        </View>
        <View style={styles.body1}>
          <View style={styles.having_cardlist}>
            <PickIslandCardList navigation={propsFtn}/>
          </View>
        </View>

      </View>
    </ImageBackground>
  );
}
