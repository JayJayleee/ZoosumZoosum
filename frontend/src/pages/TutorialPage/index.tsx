import React, {useState, useEffect} from 'react';
import {TutorialScreenProps} from '@/types/path';
import {View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {TutorialImageCard} from './TutorialImageCard';
import {ImageSourcePropType, BackHandler} from 'react-native';
import { SkipModal } from '@/components/ui/Modal/SkipModal';

type TutorialData = {
  Title: string;
  Image: ImageSourcePropType;
  index?: number;
  onPrev?: () => void;
  onNext?: () => void;
};

import {useRef} from 'react';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default function TutorialPage({navigation}: TutorialScreenProps) {
  const goIsland = () => {
    navigation.navigate('FirstEgg', {isFirstLogin: true});
  };

  const goToPrev = () => {
    carouselRef.current?.snapToPrev();
  };

  const goToNext = () => {
    carouselRef.current?.snapToNext();
  };
  const renderItem = ({item, index}: {item: TutorialData; index: number}) => {
    return (
      <TutorialImageCard
        {...item}
        index={index}
        onPrev={index > 0 ? goToPrev : undefined}
        onNext={index < data.length - 1 ? goToNext : goIsland}
        gotoIsland={goIsland}
      />
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<Carousel<TutorialData>>(null);
  const [isCloseModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const exitFtn = () => {
    navigation.navigate({
      name: 'FirstEgg',
      params: {isFirstLogin: true},
    })
  };

  // 뒤로 가기 클릭 시 종료 여부 묻도록 설정
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        setCloseModalVisible(true);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/pickPloggingFriend_image.png')}
      resizeMode="cover"
      blurRadius={1}>
      {isCloseModalVisible && (
        <SkipModal
          isModalVisible={isCloseModalVisible}
          RequestClose={() => setCloseModalVisible(false)}
          exitFtn={exitFtn}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          height: '100%',
        }}>
        <Carousel
          layout="default"
          onSnapToItem={index => setActiveIndex(index)}
          layoutCardOffset={9}
          ref={carouselRef}
          data={data}
          vertical={false}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          contentContainerCustomStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </ImageBackground>
  );
}

const data: TutorialData[] = [
  {
    Title: '쓰레기를 주워 꾸미는 나만의 섬,\n주섬주섬에 오신 것을 환영합니다!',
    Image: require('@/assets/tutorial/tutorial1.png'),
  },
  {
    Title: '주섬주섬에는 푸른 자연 속\n많은 정령들이 살고 있었습니다.',
    Image: require('@/assets/tutorial/tutorial2.png'),
  },
  {
    Title: '그러나 환경 오염으로 인해\n 살 곳을 잃어버린 아기 정령들..!',
    Image: require('@/assets/tutorial/tutorial3.png'),
  },
  {
    Title: '쓰레기 속 아기 정령들을 구해\n여러분 만의 주섬주섬을 꾸며주세요!',
    Image: require('@/assets/tutorial/tutorial4.png'),
  },
];
