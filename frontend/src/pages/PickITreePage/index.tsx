import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {PickTreeScreenProps} from 'typePath';
import styles from './style';
import AppText from '@/components/ui/Text';
import PickTreeCardList from './PickTreeCardList';

export default function PickTreePage({navigation}: PickTreeScreenProps) {
  const propsFtn = () => {
    navigation.navigate('Main')
  }
  
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
            나만의 나무를
          </AppText>
          <AppText style={styles.title_head}>
            선택하세요
          </AppText>
        </View>
        <View style={styles.body1}>
          <View style={styles.having_cardlist}>
            <PickTreeCardList navigation={propsFtn}/>
          </View>
        </View>
      </View>  
    </ImageBackground>
  )
}
