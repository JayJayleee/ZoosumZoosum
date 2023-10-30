import React, {useState, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import {Circle} from 'react-native-progress';

type AnimatedProgressCircleProps = {
  progress: number;
  duration?: number;
};

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
        size={160}
        progress={displayedProgress}
        thickness={10}
        color="#ACFA58"
        unfilledColor="#f2f2f2"
        // showsText={true} // 텍스트를 표시하지 않습니다.
      />
      <Text style={{position: 'absolute', color: 'white', fontSize: 30}}>{`${(
        displayedProgress * 100
      ).toFixed(0)}%`}</Text>
    </View>
  );
}

export default AnimatedProgressCircle;
