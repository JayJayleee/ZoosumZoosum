import {useState, useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import styles from './styles';
import AppText from '../Text';
interface ItemCarouselCardItemProps {
  item: {
    fileUrl: string;
    itemName: string;
  };
  index: number;
  activeIndex?: number;
}

export function BoxCarouselCardItem({
  item,
  index,
  activeIndex,
}: ItemCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('상자에 뭐가 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>({
    uri: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Activity/09d7ee77-a711-4952-b024-929771982e2c_pencil.png',
  });
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let anim: Animated.CompositeAnimation;

    if (index === activeIndex) {
      const startTime = Date.now();

      const loopAnimation = () => {
        const passedTime = Date.now() - startTime;
        if (passedTime >= 3000) {
          anim.stop();
          setHeaderText(`${item.itemName}을 얻었어요!`);
          setImageSrc({uri: item.fileUrl});
          bounceValue.setValue(0);
          return;
        }

        const value = Math.sin((passedTime / 700) * Math.PI) * 10;
        bounceValue.setValue(value);
        requestAnimationFrame(loopAnimation);
      };

      anim = Animated.timing(bounceValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      });

      anim.start(loopAnimation);

      timer = setTimeout(() => {
        anim.stop();
        setHeaderText(`${item.itemName}을 얻었어요!`);
        setImageSrc({uri: item.fileUrl});
        bounceValue.setValue(0);
      }, 3000);
    } else {
      setHeaderText('상자에 뭐가 들어있을까요?');
      setImageSrc({
        uri: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Activity/09d7ee77-a711-4952-b024-929771982e2c_pencil.png',
      });
      bounceValue.setValue(0);
    }

    return () => {
      clearTimeout(timer);
      if (anim) {
        anim.stop();
      }
    };
  }, [activeIndex]);

  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>{headerText}</AppText>
      <Animated.Image
        source={imageSrc}
        style={[styles.boxImage, {transform: [{translateY: bounceValue}]}]}
      />
    </View>
  );
}
