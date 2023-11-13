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
  const [variant1, setVariant1] = useState<'selectItem' | 'selectItem2'>('selectItem');
  const [variant2, setVariant2] = useState<'selectItem' | 'selectItem2'>('selectItem2');

  // useEffect를 사용하여 앱이 처음 렌더링될 때 Component1을 표시
  useEffect(() => {
    setShowComponent1(true);
    setShowComponent2(false);
    setVariant1('selectItem')
    setVariant2('selectItem2')
  }, []);

  // 첫 번째 버튼을 누를 때 호출되는 함수
  const toggleComponent1 = () => {
    setShowComponent1(true);
    setShowComponent2(false);
    setVariant1('selectItem');   // 첫 번째 버튼이 선택된 상태
    setVariant2('selectItem2');  // 두 번째 버튼이 비선택된 상태
  };

  // 두 번째 버튼을 누를 때 호출되는 함수
  const toggleComponent2 = () => {
    setShowComponent2(true);
    setShowComponent1(false);
    setVariant1('selectItem2');  // 첫 번째 버튼이 비선택된 상태
    setVariant2('selectItem');   // 두 번째 버튼이 선택된 상태
  };
  
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
        </View>
        <View style={styles.list_container}>
          {showComponent1 && <IslandList />}
          {showComponent2 && <TreeList />}
        </View>
        <View style={styles.button_container}>
          <AppButton
            variant={variant1}
            children='ISLAND'
            onPress={toggleComponent1}/>
          <AppButton
          variant={variant2}
          children='TREE'
          onPress={toggleComponent2}/>
        </View>
        <View style={styles.button_container2}>
          <AppButton
          children={showComponent1 ? '섬 선택하기' : '나무 선택하기'}
          variant='pickfriend'
          onPress={() => {
            if (showComponent1) {
              navigation.navigate('PickIsland');
            } else {
              navigation.navigate('PickTree');
            }
          }}/>
          <AppButton
          variant='gotoisland2'
          children='섬으로 돌아가기'
          onPress={() => navigation.navigate('Main')}/>
        </View>
      </View>
    </ImageBackground>  
  )
  }