import React from 'react';
import AppButton from '../../Button';
import {View, Image, FlatList} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashList} from '@/types/plogging';

interface TrashModalProps {
  isVisible: boolean;
  onClose: () => void;
  data?: TrashList[];
  navigation: () => void;
}
const PloggingResultModal = ({
  isVisible,
  onClose,
  data,
  navigation,
}: TrashModalProps) => {
  const Item = ({title, img}: TrashList) => (
    <View style={{width: 120, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{height: 100, aspectRatio: 1, resizeMode: 'contain'}}
        source={img}
      />
      <AppText style={{color: 'black', fontSize: 14, marginTop: 5}}>
        {title}
      </AppText>
    </View>
  );

  return (
    <ModalComponent
      isVisible={isVisible}
      onClose={onClose}
      onRequestClose={onClose}
      buttonInnerText={'닫기'}>
      <AppText
        style={{
          color: 'black',
          fontFamily: 'NPSfont_bold',
          fontSize: 25,
          marginBottom: 15,
        }}>
        오늘의 플로깅 결과
      </AppText>
      <FlatList
        data={data}
        renderItem={({item}) => <Item title={item.title} img={item.img} />}
        keyExtractor={(_, index) => index.toString()}
      />
      <AppButton onPress={navigation}>결과 보기</AppButton>
    </ModalComponent>
  );
};

export default PloggingResultModal;
