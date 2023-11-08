import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import { RankingScreenProps } from '@/types/path';

import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import styles from './style';


export default function RankingPage({navigation}: RankingScreenProps) {
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}>
        <View style={styles.container}>
          <View style={styles.rankingsheet}>
            <ImageBackground 
              style={StyleSheet.absoluteFill}
              source={require('@/assets/Ranking.png')}>

            </ImageBackground>
          </View>
          
        </View>
      <Text>여기는 랭킹 페이지입니다.</Text>
    </ImageBackground>
  );
}
