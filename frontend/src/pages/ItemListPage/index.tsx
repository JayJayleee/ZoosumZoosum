import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Button,
} from 'react-native';

import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import {ItemListscreenProps} from 'typePath';
import styles from './style';

import IslandList from './IslandList';
import TreeList from './TreeList';

export default function ItemListPage({navigation}: ItemListscreenProps) {

  // 두 개의 컴포넌트를 토글하기 위한 상태 변수 정의
  const [showComponent1, setShowComponent1] = useState(true);
  const [showComponent2, setShowComponent2] = useState(false);

  // useEffect를 사용하여 앱이 처음 렌더링될 때 Component1을 표시
  useEffect(() => {
    setShowComponent1(true);
    setShowComponent2(false);
  }, []);

  // 첫 번째 버튼을 누를 때 호출되는 함수
  const toggleComponent1 = () => {
    setShowComponent1(true);
    setShowComponent2(false);
  };

  // 두 번째 버튼을 누를 때 호출되는 함수
  const toggleComponent2 = () => {
    setShowComponent2(true);
    setShowComponent1(false);
  };
  
  // 섬 선택 호출 함수(props로 전달)
  const goToSelectIsland = () => {
    navigation.navigate('PickFriend')
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
            내가 보유한 아이템
          </AppText>
          <View style={styles.button_container}>
          <AppButton
            variant='selectLeft'
            children='ISLAND'
            onPress={toggleComponent1}/>
          <AppButton
          variant='selectRight'
          children='TREE'
          onPress={toggleComponent2}/>
         </View>
        </View>
        <View style={styles.list_container}>
          {showComponent1 && <IslandList goToSelectIsland={goToSelectIsland}/>}
          {showComponent2 && <TreeList />}
        </View>
      </View>
    </ImageBackground>  
  )
  }