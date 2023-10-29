import React, {Component} from 'react';
import {FlatListProps, View, Button} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {BadgeCarouselCardItem} from '../Carousel/BadgeCarouselCardItem';
import {BoxCarouselCardItem} from '../Carousel/BoxCarouselCardItem';
import {AnimalCarouselCardItem} from '../Carousel/AnimalCarouselCardItem';
import data from '../../../pages/PloggingResultPage/data';
import {ITEM_WIDTH, SLIDER_WIDTH} from '@/constants/styles';

export default function CarouselCards() {
  const isCarousel = React.useRef<
    Carousel<any> & Component<FlatListProps<any>, {}, any>
  >(null);

  const [index, setIndex] = React.useState(0);

  const combinedData = [
    ...data.resposeRewardDto.badgeRewardList,
    ...data.resposeRewardDto.itemRewardList,
    ...data.resposeRewardDto.animalRewardList,
  ];
  interface CarouselProps {
    item: any;
    index: any;
    activeIndex?: any;
  }

  const renderItem = ({item, index: itemIndex}: CarouselProps) => {
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
    <View>
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
        <Button title="끝!" onPress={() => console.log('끝!')}></Button>
      ) : (
        // 마지막 페이지가 아닌 경우
        // TODO: 버튼 만들어놓기....
        <Button
          title="다음으로"
          onPress={() => isCarousel.current?.snapToNext()}></Button>
      )}
    </View>
  );
}
