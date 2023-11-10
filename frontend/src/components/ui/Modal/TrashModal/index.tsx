import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, Button} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashDataReturnList} from '@/types/plogging';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/path';
import AppButton from '../../Button';
import FastImage from 'react-native-fast-image';
interface TrashModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: TrashDataReturnList[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
  animalImg: string;
}

type TrashType =
  | '일반 쓰레기'
  | '유리'
  | '금속'
  | '종이'
  | '플라스틱'
  | '비닐 봉투'
  | '없음';

const tipsByType: Record<TrashType, string[]> = {
  '일반 쓰레기': [
    '일반 쓰레기는 잘 분리해서 버리세요.',
    '음식물이나 액체가 묻은 종이는 일반 쓰레기로 분류하세요.',
    '깨진 유리나 도자기는 사실 일반 쓰레기에 포함됩니다.',
  ],
  유리: [
    '유리병은 라벨을 제거하고 깨끗이 씻어서 분리배출하세요.',
    '창문 유리나 거울은 일반 쓰레기로 분류해주세요.',
    '색깔별로 분리하여 유리 전용 수거함에 버리세요.',
    '소형 유리병은 라벨과 뚜껑을 분리한 후 배출하세요.',
    '안경이나 특수 유리는 별도로 분리 수거합니다.',
  ],
  금속: [
    '캔은 압착하여 내용물을 비우고 분리배출하세요.',
    '금속류는 가능한 작게 압축하여 배출하는 것이 좋습니다.',
    '스프레이 캔은 내용물을 비우고 구멍을 뚫어서 배출하세요.',
  ],
  종이: [
    '종이류는 젖지 않게 해서 재활용하세요.',
    '종이팩은 헹구어서 압착한 후 묶어서 버리세요.',
    '영수증과 같은 감열지는 일반 쓰레기로 버리세요.',
  ],
  플라스틱: [
    '플라스틱은 깨끗이 씻어서 배출하세요.',
    '플라스틱의 라벨을 제거하고 배출하세요.',
    '비닐 포장은 플라스틱과 별도로 분리 배출하세요.',
    '투명 페트병은 따로 분리 배출해주세요.',
  ],
  '비닐 봉투': [
    '검정, 유색, 투명 비닐 봉투 모두 재활용이 가능해요',
    '믹스 커피 처럼 작은 비닐 봉투도 재활용이 가능해요.',
    '이물질이 많이 묻은 비닐 봉투는 일반 쓰레기에 버려주세요',
  ],
  없음: ['찍힌 쓰레기가 없어요! 다시 한 번 찍어주세요.'],
};

const TrashModal = ({
  isVisible,
  onClose,
  data,
  navigation,
  animalImg,
}: TrashModalProps) => {
  const [tip, setTip] = useState('');
  useEffect(() => {
    if (isVisible && data.length > 0) {
      const mostTrashType: TrashType = getMostTrashType(data);
      const newTip = getRandomTip(mostTrashType);
      setTip(newTip);
    }
  }, [isVisible]);

  const Item = ({title, img, description}: TrashDataReturnList) => (
    <View
      style={{
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FastImage
        style={{height: 100, aspectRatio: 1}}
        source={img}
        resizeMode="contain"
      />
      <AppText style={{color: 'black', fontSize: 14, marginTop: 5}}>
        {title}
      </AppText>
      <AppText style={{color: 'black', fontSize: 14, marginTop: 5}}>
        {description}
      </AppText>
    </View>
  );

  const getMostTrashType = (data: TrashDataReturnList[]): TrashType => {
    const trashCounts: Record<TrashType, number> = {
      '일반 쓰레기': 0,
      유리: 0,
      금속: 0,
      종이: 0,
      플라스틱: 0,
      '비닐 봉투': 0,
      없음: 0,
    };

    data.forEach(item => {
      const count =
        typeof item.description === 'number'
          ? item.description
          : parseInt(item.description, 10);
      if (item.title in trashCounts) {
        trashCounts[item.title as TrashType] += count;
      }
    });

    let maxCount = 0;
    let maxTrashType: TrashType = '없음';
    Object.entries(trashCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxTrashType = type as TrashType;
      }
    });

    return maxTrashType;
  };

  const getRandomTip = (type: TrashType): string => {
    const tips = tipsByType[type];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const mostTrashType: TrashType = getMostTrashType(data);
  const mostTrashTypeTip = getRandomTip(mostTrashType);

  return (
    <ModalComponent
      isVisible={isVisible}
      onClose={onClose}
      onRequestClose={onClose}
      buttonInnerText={'닫기'}
      noButton={true}>
      <AppText
        style={{
          color: 'black',
          fontFamily: 'NPSfont_bold',
          fontSize: 25,
          marginBottom: 15,
        }}>
        방금 주운 쓰레기
      </AppText>
      <View
        style={{
          width: '100%',
          backgroundColor: '#229464',
          alignItems: 'center',
          justifyContent: 'center',
          height: '8%',
          borderRadius: 10,
          marginBottom: '3%',
        }}>
        <AppText style={{color: 'white'}}>Tip: {tip}</AppText>
      </View>
      <FlatList
        data={data}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({item}) => (
          <Item
            title={item.title}
            img={item.img}
            description={item.description}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
      />

      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          // marginTop: '4%',
        }}>
        <AppButton
          children="다시 찍을래!"
          variant="trash_red"
          onPress={() =>
            navigation.navigate('Camera', {getAnimalIMG: animalImg})
          }
        />
        <AppButton children="완료!" variant="trash_green" onPress={onClose} />
      </View>
    </ModalComponent>
  );
};

export default TrashModal;
