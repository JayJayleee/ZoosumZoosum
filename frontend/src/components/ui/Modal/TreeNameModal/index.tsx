import React, {useEffect, useState, useRef} from 'react';
import AppButton from '../../Button';
import {View, Image, FlatList} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import Carousel from 'react-native-snap-carousel';
import {ITEM_WIDTH, SLIDER_WIDTH} from '@/constants/styles';
import {getStorage} from '@/apis';
import {CarouselProps} from '@/types/plogging';
import {InputModalItem} from './InputModalItem';
import {TextModalItem} from './TextModalItem';

interface TreeNameModalProps {
  isTreeModalVisible: boolean;
  onTreeModalClose: () => void;
}

export default function TreeNameModal({
  isTreeModalVisible,
  onTreeModalClose,
}: TreeNameModalProps) {
  const [index, setIndex] = React.useState(0);
  const carouselRef = useRef<any>(null);

  const handleNextPress = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext(false); // 다음 아이템으로 슬라이드
    }
  };

  const Nickname = getStorage('Nickname');

  const combinedData = [
    {
      image: require('@/assets/img_icon/seed_icon.png'),
      description: '앗! 씨앗의 상태가?',
      btn: '두근두근',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: '1000개를 모아서 \n 나무로 변했어요!',
      btn: '너무 신난다!',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: '',
      btn: '나무 심기',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: `${Nickname}님 덕분에 지구가 더 건강해졌어요!`,
      btn: '내 섬으로 돌아가기',
    },
  ];

  const renderItem = ({item, index}: CarouselProps) => {
    if ((index = 1 | 2 | 4)) {
      return <TextModalItem item={item} index={index} />;
    } else if ((index = 3)) {
      return <InputModalItem item={item} index={index} />;
    }
  };
  return (
    <>
      <ModalComponent
        isVisible={isTreeModalVisible}
        onClose={onTreeModalClose}
        onRequestClose={onTreeModalClose}
        noButton={true}
        buttonInnerText={'닫기'}>
        <Carousel
          vertical={false}
          layout={'default'}
          layoutCardOffset={18}
          ref={carouselRef}
          data={combinedData}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={index => setIndex(index)}
          inactiveSlideShift={0}
          inactiveSlideOpacity={0}
          style={{height: 300}}
        />
        <AppButton
          onPress={handleNextPress} // 버튼 클릭 시 다음 아이템으로 이동
        >
          다음 으로
        </AppButton>
      </ModalComponent>
    </>
  );
}
