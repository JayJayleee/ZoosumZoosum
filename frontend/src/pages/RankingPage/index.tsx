import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import { RankingScreenProps } from '@/types/path';

import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import styles from './style';

import TopRanking from './topRanking';
import RegionRanking from './regionRanking';


export default function RankingPage({navigation}: RankingScreenProps) {

  // 두 개의 컴포넌트를 토글하기 위한 상태 변수 정의
  const [showComponent1, setShowComponent1] = useState(true);
  const [showComponent2, setShowComponent2] = useState(false);
  const [variant1, setVariant1] = useState<'ranking' | 'rankingUnselect'>('ranking');
  const [variant2, setVariant2] = useState<'ranking' | 'rankingUnselect'>('rankingUnselect');


  // useEffect를 사용하여 앱이 처음 렌더링될 때 Component1을 표시
  useEffect(() => {
    setShowComponent1(true);
    setShowComponent2(false);
    setVariant1('rankingUnselect')
    setVariant2('ranking')
  }, []);

  // 첫 번째 버튼을 누를 때 호출되는 함수
  const toggleComponent1 = () => {
    setShowComponent1(true);
    setShowComponent2(false);
    setVariant1('rankingUnselect')
    setVariant2('ranking')
  };

  // 두 번째 버튼을 누를 때 호출되는 함수
  const toggleComponent2 = () => {
    setShowComponent2(true);
    setShowComponent1(false);
    setVariant2('rankingUnselect')
    setVariant1('ranking')
  };

  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}>
        <View style={styles.container}>
          <View style={styles.rankingsheet}>
            <View style={styles.rankingpage}>
              <ImageBackground 
              style={StyleSheet.absoluteFill}
              source={require('@/assets/Ranking.png')}
              resizeMode='stretch'></ImageBackground>
              <View style={styles.button_container}>
                <AppButton
                  variant={variant1}
                  children='전체 랭킹'
                  onPress={toggleComponent1}/>
                <AppButton
                  variant={variant2}
                  children='지역 랭킹'
                  onPress={toggleComponent2}/>
              </View>
              <View style={styles.list_container}>
                {showComponent1 && <TopRanking />}
                {showComponent2 && <RegionRanking />}
              </View>
            </View> 
          </View>
        </View>
    </ImageBackground>
  );
}
