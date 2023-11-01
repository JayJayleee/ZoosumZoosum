import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import styles from './styles';

// 빛나는 효과만 따로 빼둔 컴포넌트임. duration으로 속도 수정 가능
export function ShiningEffect() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: 100,
      duration: 200000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '36000deg'],
  });

  return (
    <Animated.Image
      source={require('@/assets/img_icon/light_effect.png')}
      style={[styles.image, {transform: [{rotate: spin}]}]} // 회전 애니메이션 적용
    />
  );
}
