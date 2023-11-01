import React, {Component} from 'react';
import {
  FlatListProps,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {BadgeCarouselCardItem} from '../Carousel/BadgeCarouselCardItem';
import {BoxCarouselCardItem} from '../Carousel/BoxCarouselCardItem';
import {AnimalCarouselCardItem} from '../Carousel/AnimalCarouselCardItem';
import {ProgressCarouselCardItem} from './ProgressCarouselCardItem';
import {SeedCarouselCardItem} from './SeedCarouselCardItem';
import data from '../../../pages/PloggingResultPage/data';
import {ITEM_WIDTH, SLIDER_WIDTH} from '@/constants/styles';
import AppButton from '../Button';
import styles from './styles';
import AppText from '../Text';

interface CarouselProps {
  item: any;
  index: any;
  activeIndex?: any;
}

export default function CarouselCards() {
  const isCarousel = React.useRef<
    Carousel<any> & Component<FlatListProps<any>, {}, any>
  >(null);

  const [index, setIndex] = React.useState(0);
  // 사용중인 라이브러리에서는 데이터를 무조건 리스트 형태로 받은 뒤 넣어야 페이지로 인식함
  // 미션에 대한 단일 데이터 합친 리스트
  const missionData = [
    {
      missonTrashLimit: data.resposeRewardDto.missonTrashLimit,
      missonLengthLimit: data.resposeRewardDto.missonLengthLimit,
      missonTimeLimit: data.resposeRewardDto.missonTimeLimit,
      missonTrash: data.resposeRewardDto.missonTrash,
      missonLength: data.resposeRewardDto.missonLength,
      missonTime: data.resposeRewardDto.missonTime,
    },
  ];

  // 씨앗과 및 그 외 데이터 모아둔 리스트
  const seed_TotalData = [
    {
      totalRewardCount: data.resposeRewardDto.totalRewardCount,
      badgeRewardCount: data.resposeRewardDto.badgeRewardCount,
      itemRewardCount: data.resposeRewardDto.itemRewardCount,
      animalRewardCount: data.resposeRewardDto.animalRewardCount,
      seedCount: data.resposeRewardDto.seedCount,
    },
  ];

  // 데이터 합친 리스트, 값이 없으면 빈 값을 반환하여 리스트로 들어오지 않음.
  // 여기서 데이터 순서 바꾸면, 리스트 순서도 바뀐다.
  const combinedData = [
    ...(data.resposeRewardDto.missonTrashLimit ||
    data.resposeRewardDto.missonLengthLimit ||
    data.resposeRewardDto.missonTimeLimit
      ? missionData
      : []),
    ...(data.resposeRewardDto.seedCount ? seed_TotalData : []),
    ...(data.resposeRewardDto.badgeRewardList.length > 0
      ? data.resposeRewardDto.badgeRewardList
      : []),
    ...(data.resposeRewardDto.itemRewardList.length > 0
      ? data.resposeRewardDto.itemRewardList
      : []),
    ...(data.resposeRewardDto.animalRewardList.length > 0
      ? data.resposeRewardDto.animalRewardList
      : []),
  ];

  const renderItem = ({item, index: itemIndex}: CarouselProps) => {
    if (item.missonTrashLimit) {
      return <ProgressCarouselCardItem item={item} index={itemIndex} />;
    }
    if (item.seedCount)
      return <SeedCarouselCardItem item={item} index={itemIndex} />;
    if (item.badgeId)
      return <BadgeCarouselCardItem item={item} index={itemIndex} />;
    if (item.itemId)
      return (
        <BoxCarouselCardItem
          item={item}
          index={itemIndex}
          activeIndex={index}
        />
      );
    if (item.animalId)
      return (
        <AnimalCarouselCardItem
          item={item}
          index={itemIndex}
          activeIndex={index}
        />
      );
  };

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

      {isCarousel.current && (
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
      {index === combinedData.length - 1 ? (
        // 마지막 페이지인 경우
        <AppButton
          variant="carouselButton"
          children="끝!"
          onPress={() => console.log('끝!')}
        />
      ) : (
        //마지막 페이지가 아닌 경우
        <AppButton
          variant="carouselButton"
          children="다음으로"
          onPress={() => isCarousel.current?.snapToNext()}
        />
      )}
    </View>
  );
}
