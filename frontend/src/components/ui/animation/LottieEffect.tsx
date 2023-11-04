import React from 'react';
import LottieView from 'lottie-react-native';

export const Gift = () => {
  return (
    <LottieView
      style={{width: 500, marginTop: 120, aspectRatio: 1}}
      source={require('@/assets/animation/gift.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => {}}
    />
  );
};

export const Egg = () => {
  return (
    <LottieView
      style={{width: 300, marginTop: 60, aspectRatio: 1}}
      source={require('@/assets/animation/egg.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => {}}
    />
  );
};
