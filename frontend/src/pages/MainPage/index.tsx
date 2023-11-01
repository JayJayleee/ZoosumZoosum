import React from 'react';
import { Button, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import {MainScreenProps} from 'typePath';
import FastImage from 'react-native-fast-image';
import styles from './styles';

export default function MainPage({navigation}: MainScreenProps) {

  const islandUri: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png"
  const treeUri: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png"
  const animal1: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_2.gif"
  const animal2: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_2.gif"
  const animal3: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_1.gif"
  const animal4: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_1.gif"
  const animal5: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_3.gif"


  return (
    <ImageBackground source={require("@/assets/mainpage_image/Background.png")} style={StyleSheet.absoluteFill}>
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
        <Image style={styles.island} source={{uri: islandUri}} resizeMode='stretch' />
        <Image style={styles.tree} source={{uri: treeUri}} resizeMode='stretch' />
        <FastImage style={styles.firstAnimal} source={{uri: animal1}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.secondAnimal} source={{uri: animal2}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.thirdAnimal} source={{uri: animal3}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.fourthAnimal} source={{uri: animal4}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.fifthAnimal} source={{uri: animal5}} resizeMode={FastImage.resizeMode.contain} />
      </View>
      <View style={styles.ploggingButton}>
        <Button title="산책하기" onPress={() => navigation.navigate('PickPloggingFriend')} />
      </View>
    </ImageBackground>
  );
}
