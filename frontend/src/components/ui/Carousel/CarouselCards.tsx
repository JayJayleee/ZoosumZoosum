import React, {Component, useState, useEffect} from 'react';
import {FlatListProps, View, Keyboard} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {BadgeCarouselCardItem} from '../Carousel/BadgeCarouselCardItem';
import {BoxCarouselCardItem} from '../Carousel/BoxCarouselCardItem';
import {AnimalCarouselCardItem} from '../Carousel/AnimalCarouselCardItem';
import {ProgressCarouselCardItem} from './ProgressCarouselCardItem';
import {SeedCarouselCardItem} from './SeedCarouselCardItem';
import {ITEM_WIDTH, SLIDER_WIDTH} from '@/constants/styles';
import AppButton from '../Button';
import styles from './styles';
import {CarouselProps, NewData} from '@/types/plogging';
import phonedata from '@/pages/PloggingResultPage/data';
import AppText from '../Text';
interface CarouselCardsProps {
  onNavigate: () => void;
  data?: NewData;
}

export default function CarouselCards({onNavigate, data}: CarouselCardsProps) {
  const [resultDataList, setResultDataList] = useState<any>(data);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const isCarousel = React.useRef<
    Carousel<any> & Component<FlatListProps<any>, {}, any>
  >(null);

  useEffect(() => {
    setResultDataList(data);
  }, [data]);

  const [index, setIndex] = React.useState(0);

  // 데이터 합친 리스트, 값이 없으면 빈 값을 반환하여 리스트로 들어오지 않음.
  // 여기서 데이터 순서 바꾸면, 리스트 순서도 바뀐다.
  const combinedData = [
    ...(resultDataList.missionList ? resultDataList.missionList : []),
    ...(resultDataList.islandList ? resultDataList.islandList : []),
    ...(resultDataList.treeList ? resultDataList.treeList : []),
    ...(resultDataList.animalList ? resultDataList.animalList : []),
    ...(resultDataList.seedList && resultDataList.seedList[0].addSeed !== 0
      ? resultDataList.seedList
      : []),
    ...(resultDataList.userBadgeList ? resultDataList.userBadgeList : []),
  ];

  const renderItem = ({item, index: itemIndex}: CarouselProps) => {
    if (item.missionLength !== undefined) {
      // console.log(resultDataList);
      console.log('들어오는거', combinedData);
      console.log('컴바인', combinedData.length);
      return <ProgressCarouselCardItem item={item} index={itemIndex} />;
    }
    if (item.addSeed && item.addSeed != 0) {
      return <SeedCarouselCardItem item={item} index={itemIndex} />;
    }
    if (item.badgeId) {
      return <BadgeCarouselCardItem item={item} index={itemIndex} />;
    }
    if (item.itemId) {
      return (
        <BoxCarouselCardItem
          item={item}
          index={itemIndex}
          activeIndex={index}
          itemType={item.itemType}
        />
      );
    }
    if (item.animalId) {
      return (
        <AnimalCarouselCardItem
          item={item}
          index={itemIndex}
          activeIndex={index}
        />
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        vertical={false}
        layout={'default'}
        layoutCardOffset={18}
        ref={isCarousel}
        data={combinedData}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        // useScrollView={true}
        inactiveSlideShift={0}
        inactiveSlideOpacity={0}
      />

      {!isKeyboardVisible && isCarousel.current && (
        <Pagination
          dotsLength={combinedData.length}
          activeDotIndex={index}
          carouselRef={isCarousel.current}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      )}

      {!isKeyboardVisible && index === combinedData.length - 1 ? (
        // 마지막 페이지인 경우
        <AppButton variant="carouselBtn" children="끝!" onPress={onNavigate} />
      ) : (
        !isKeyboardVisible && (
          //마지막 페이지가 아닌 경우
          <AppButton
            variant="carouselBtn"
            children="다음으로"
            onPress={() => {
              // console.log(combinedData[index]);
              isCarousel.current?.snapToNext();
            }}
          />
        )
      )}
      {/* {combinedData.map((item, index) => (
        <AppText key={index}>{JSON.stringify(item)}</AppText>
      ))} */}
    </View>
  );
}
