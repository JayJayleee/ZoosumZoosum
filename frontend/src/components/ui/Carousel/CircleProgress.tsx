import React, {useState, useEffect} from 'react';
import {View, Animated, Image} from 'react-native';
import {Circle} from 'react-native-progress';
import AppText from '../Text';
import {AnimatedProgressCircleProps} from '@/types/plogging';

function AnimatedProgressCircle({
  progress,
  duration = 1000,
  children,
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
        size={120}
        progress={displayedProgress}
        thickness={15}
        color="#2dcf8b"
        unfilledColor="#f2f2f2"
      />
      {children && (
        <Image
          source={children}
          style={{
            width: 90,
            height: 90,
            position: 'absolute',
            opacity: 0.5,
          }}
        />
      )}
      <AppText
        style={{position: 'absolute', color: 'white', fontSize: 30}}>{`${(
        displayedProgress * 100
      ).toFixed(0)}%`}</AppText>
    </View>
  );
}

export default AnimatedProgressCircle;
