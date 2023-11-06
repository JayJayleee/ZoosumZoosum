import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import {FriendListscreenProps} from 'typePath';
import styles from './style';
import AnimalCardlist from './AnimalCardlist';
import SelectAnimalCardlist from './SelectAnimalCardlist';


export default function FriendListPage({navigation}: FriendListscreenProps) {

  const propsFtn = (data: number) => {
    navigation.navigate({
      name: 'FriendDetail',
      params: {animalId: data}
    })
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
            나와 함께한 친구들
          </AppText>
        </View>
        <View style={styles.body1}>
          <AppText style={styles.title_body}>
            섬에 나와있는 동물들
          </AppText>
          <View style={styles.select_cardlist}>
            <SelectAnimalCardlist navigation={propsFtn} />
          </View>
        </View>
        <AppButton
        children='동물 선택하기'
        variant='pickfriend'
        onPress={() => navigation.navigate('PickFriend')}/>
        <View style={styles.body2}>
          <View style={styles.having_cardlist}>
            <AnimalCardlist navigation={propsFtn} />
          </View>
        </View>
        <AppButton
        variant='gotoisland'
        children='섬으로 돌아가기'
        onPress={() => navigation.navigate('Main')}/>
        
      </View>  
    </ImageBackground>
  );
}
