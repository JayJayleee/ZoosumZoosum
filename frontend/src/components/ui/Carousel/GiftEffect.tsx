import React from 'react';
import LottieView from 'lottie-react-native';

const Gift = () => {
  return (
    <LottieView
      style={{width: 500, marginTop: 60, aspectRatio: 1}}
      source={require('@/assets/animation/gift.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => {}}
    />
  );
};

export default Gift;
