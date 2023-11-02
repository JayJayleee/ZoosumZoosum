import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {Circle} from 'react-native-progress';
import AppText from '../Text';
import {AnimatedProgressCircleProps} from '@/apis/plogging';

function AnimatedProgressCircle({
  progress,
  duration = 1000,
}: AnimatedProgressCircleProps) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: duration,
      useNativeDriver: false,
    }).start();

    const listener = animatedValue.addListener(({value}) => {
      setDisplayedProgress(parseFloat(value.toFixed(2)));
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [progress]);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Circle
        size={140}
        progress={displayedProgress}
        thickness={15}
        color="#ACFA58"
        unfilledColor="#f2f2f2"
      />
      <AppText
        style={{position: 'absolute', color: 'white', fontSize: 30}}>{`${(
        displayedProgress * 100
      ).toFixed(0)}%`}</AppText>
    </View>
  );
}

export default AnimatedProgressCircle;
