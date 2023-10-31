import React from 'react';
import { Button, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import {MainScreenProps} from 'typePath';
import styles from './styles';

export default function MainPage({navigation}: MainScreenProps) {

  const islandUri: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png"
  const treeUri: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png "

  return (
    <ImageBackground source={require("@/assets/mainpage_image/main_background.png")} style={StyleSheet.absoluteFill}>
      <View style={styles.upperStatus}>
        <Text>여기는 상단 스탯 바가 들어갈 자리</Text>
      </View>
      <View style={styles.banner}>
        <Text>여기는 배너가 들어갈 자리</Text>
      </View>
      <View style={styles.buttonToggle}>
        <Text>여기는 버튼 토글이 들어갈 자리</Text>
      </View>
      <View style={styles.centerImage}>
        <Image style={{width:470, height: 300, zIndex: 1}} source={{uri: islandUri}} resizeMode='stretch' />
        <Image style={{width:100, height: 100, zIndex: 2}} source={{uri: treeUri}} resizeMode='stretch' />
      </View>
      <View style={styles.ploggingButton}>
        <Button
          title="산책하기"
          onPress={() =>
            navigation.navigate('PickPloggingFriend')
          }
        />
      </View>
    </ImageBackground>
  );
}
