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

  const [Nickname, setNickname] = useState<string | null>();

  useEffect(() => {
    const getnickname = async () => {
      const nick = await getStorage('Nickname');
      setNickname(nick);
    };

    getnickname();
  }, []);

  const handleNextPress = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext(false); // 다음 아이템으로 슬라이드
    }
  };

  const combinedData = [
    {
      image: require('@/assets/img_icon/seed_icon.png'),
      description: '앗! 씨앗의 상태가?',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: '1000개를 모아서 \n 나무로 변했어요!',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: '',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: `${Nickname}님 덕분에 지구가 더 건강해졌어요!`,
    },
  ];
  const [buttonText, setButtonText] = useState('다음 으로');

  useEffect(() => {
    switch (index) {
      case 0:
        setButtonText('두근두근');
        break;
      case 1:
        setButtonText('너무 신난다!');
        break;
      case 2:
        setButtonText('나무 심기');
        break;
      case 3:
        setButtonText('내 섬으로 가기');
        break;
      default:
        setButtonText('다음 으로');
        break;
    }
  }, [index]);

  const renderItem = ({item, index}: CarouselProps) => {
    switch (index) {
      case 0:
      case 1:
      case 3:
        return <TextModalItem item={item} index={index} />;
      case 2:
        return <InputModalItem item={item} index={index} />;
      default:
        return null; // 혹은 배열 범위를 벗어난 경우를 처리하는 로직
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
        />
        <AppButton
          onPress={handleNextPress} // 버튼 클릭 시 다음 아이템으로 이동
        >
          {buttonText}
        </AppButton>
      </ModalComponent>
    </>
  );
}
