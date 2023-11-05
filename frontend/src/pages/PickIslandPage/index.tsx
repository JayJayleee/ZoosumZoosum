import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {PickIslandScreenProps} from 'typePath';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import PickIslandCardList from './PickIslandCardList';

export default function PickIslandPage({navigation}: PickIslandScreenProps) {
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
            나만의 섬을
          </AppText>
          <AppText style={styles.title_head}>
            선택하세요
          </AppText>
        </View>
        <View style={styles.body1}>
          <View style={styles.having_cardlist}>
            <PickIslandCardList />
          </View>
        </View>
        <AppButton
        variant='gotoisland'
        children='선택완료'
        onPress={() => navigation.navigate('ItemList')}/>
      </View>  
    </ImageBackground>
  )
}
