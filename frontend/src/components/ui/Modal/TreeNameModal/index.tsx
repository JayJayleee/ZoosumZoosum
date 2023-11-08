import React, {useEffect, useState, useRef, useCallback} from 'react';
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
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {treeApi} from '@/apis/tree';
import {tree} from '@/types/tree';

interface TreeNameModalProps {
  isTreeModalVisible: boolean;
  onTreeModalClose: () => void;
}

export default function TreeNameModal({
  isTreeModalVisible,
  onTreeModalClose,
}: TreeNameModalProps) {
  const queryClient = useQueryClient();
  const [index, setIndex] = React.useState(0);
  const carouselRef = useRef<any>(null);

  const [Nickname, setNickname] = useState<string | null>();

  useEffect(() => {
    console.log('닉네임');
    const getnickname = async () => {
      const nick = await getStorage('Nickname');
      setNickname(nick);
    };

    getnickname();
  }, []);

  const handleNextPress = () => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext(true); // 다음 아이템으로 슬라이드
    }
  };

  const [userData, setUserData] = useState<tree>({
    userName: '',
    treeName: '',
    userPhone: null,
    userBirth: null,
  });

  // userName, treeName, userPhone, userBirth 각각에 대한 올바른 타입을 지정해주세요.
  const handleUserData = useCallback((data: tree) => {
    setUserData(data);
  }, []);

  const plantTree = useMutation(treeApi, {
    onSuccess: () => {
      console.log('나무 심기 성공');
      console.log('나무 심기 성공 데이터', userData);
      handleNextPress();
      // 메인 정보 다시 가져오게 하기. 키 값 오류인지 수혁이한테 확인 요청하기.
      queryClient.invalidateQueries(['mainStatus']);
    },
    onError: () => {
      console.log('나무 심기 실패');
      console.log('나무 심기 에러', userData);
    },
  });

  const handleButtonClick = () => {
    switch (index) {
      case 0:
        handleNextPress();
        break;
      case 1:
        handleNextPress();
        break;
      case 2:
        plantTree.mutate(userData);
        break;
      case 3:
        onTreeModalClose();
        break;
    }
  };

  const combinedData = [
    {
      image: require('@/assets/img_icon/seed_icon.png'),
      description: '앗! 씨앗의 상태가?',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: '1000개를 모아서\n나무로 변했어요!',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: '',
    },
    {
      image: require('@/assets/mainpage_image/single_tree_img.png'),
      description: `${Nickname}님 덕분에\n지구가 더 건강해졌어요!`,
    },
  ];
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    console.log('버튼 텍스트 useEffect가 실행됨');
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
        return (
          <InputModalItem
            item={item}
            index={index}
            onUserData={handleUserData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ModalComponent
        isVisible={isTreeModalVisible}
        onClose={onTreeModalClose}
        onRequestClose={onTreeModalClose}
        noButton={true}
        buttonInnerText={'닫기'}
        ViewStyle="treeInfo">
        <View
          style={{
            backgroundColor: 'red',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
            style={{backgroundColor: 'red'}}
          />
          <AppButton variant="animalName" onPress={handleButtonClick}>
            {buttonText}
          </AppButton>
        </View>
      </ModalComponent>
    </>
  );
}
