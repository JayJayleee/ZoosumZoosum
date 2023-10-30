import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {FriendListscreenProps} from 'typePath';
import styles from './style';
import AnimalCardlist from './AnimalCardlist';
import SelectAnimalCardlist from './SelectAnimalCardlist';

export default function FriendListPage({navigation}: FriendListscreenProps) {
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
          <Text style={styles.title_head}>
            나와 함께한 친구들
          </Text>
        </View>
        <View style={styles.body1}>
          <Text style={styles.title_body}>
            섬에 나와있는 동물들
          </Text>
          <View style={styles.select_cardlist}>
            <SelectAnimalCardlist />
          </View>
        </View>
        <View style={styles.body2}>
          <View style={styles.having_cardlist}>
            <AnimalCardlist />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={styles.button_text}>섬으로 돌아가기</Text>
        </TouchableOpacity>
        
      </View>  
    </ImageBackground>
  );
}
