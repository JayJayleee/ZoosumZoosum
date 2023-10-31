import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {PickFriendscreenProps} from 'typePath';
import styles from './style';
import AppText from '@/components/ui/Text';
import PickAnimalCardlist from './PickAnimalCardlist';

export default function PickFriendPage({navigation}: PickFriendscreenProps) {
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}>
      <View
      style={styles.backgroungcolor}
      ></View>
      <View style={styles.container}>
        <View style={styles.head}>
          <AppText style={styles.title_head}>
            섬에서 함께할
          </AppText>
          <AppText style={styles.title_head}>
            친구들을 선택해주세요
          </AppText>
        </View>
        <View style={styles.body1}>
          <View style={styles.having_cardlist}>
            <PickAnimalCardlist />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <AppText style={styles.button_text}>섬으로 돌아가기</AppText>
        </TouchableOpacity>
        
      </View>  
    </ImageBackground>
  )
}
