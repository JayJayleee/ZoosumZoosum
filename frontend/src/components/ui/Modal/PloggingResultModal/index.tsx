import React from 'react';
import AppButton from '../../Button';
import {View, Image, FlatList, Text} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashList} from '@/types/plogging';
import styles from './styles';

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
  const topContent = (
    <View style={styles.overlayContainer}>
      <AppText style={styles.overlayText}>오늘도 주섬주섬 성공!</AppText>
      <Image
        source={{uri: 'https://i.imgur.com/Rr9HDQw.png'}}
        style={styles.overlayImage}
      />
      {/* 
      <Image
        source={{uri: 'https://i.imgur.com/7CbpjWi.png'}}
        style={styles.overlayRightImage}
      /> */}
    </View>
  );

  const Item = ({title, img}: TrashList) => (
    <View style={styles.ItemContainer}>
      <Image style={styles.ItemImage} source={img} />
      <View style={styles.ItemAlign}>
        <AppText style={styles.ItemText}>{title}</AppText>
      </View>
    </View>
  );

  return (
    <>
      <ModalComponent
        isVisible={isVisible}
        onClose={onClose}
        onRequestClose={onClose}
        noButton={true}
        buttonInnerText={'닫기'}
        modalStyle="top"
        TopChildren={topContent}>
        <AppText style={styles.Title}>오늘의 플로깅 결과</AppText>
        <FlatList
          data={data}
          renderItem={({item}) => <Item title={item.title} img={item.img} />}
          keyExtractor={(_, index) => index.toString()}
        />
        <AppButton variant={'ploggingRST'} onPress={navigation}>
          결과 보기
        </AppButton>
      </ModalComponent>
    </>
  );
};

export default PloggingResultModal;
