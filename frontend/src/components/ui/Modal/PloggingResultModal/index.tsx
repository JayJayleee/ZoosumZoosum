import React, {useEffect, useState} from 'react';
import AppButton from '../../Button';
import {View, Image, FlatList} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashList} from '@/types/plogging';
import styles from './styles';
import {PloggingResultFtn} from '@/apis/plogging';
import {useMutation} from '@tanstack/react-query';
import {ActivityDataType, NewData} from '@/types/plogging';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PloggingResultModalProps {
  isVisible: boolean;
  onClose: () => void;
  data?: TrashList[];
  navigation: (newData: NewData) => void;
  activityData?: {
    activityImg: any;
    activityRequestDto: {
      length: number;
      time: number;
      trash: number;
    };
    animalId: number;
  };
}
const PloggingResultModal = ({
  isVisible,
  onClose,
  data,
  navigation,
  activityData,
}: PloggingResultModalProps) => {
  // useMutation을 사용하여 서버 요청을 관리합니다.

  // console.log(activityData, '애니멀 아이디 들어옴?');
  const mutation = useMutation(
    (activityData: ActivityDataType) => PloggingResultFtn(activityData),
    {
      onSuccess: (responseData: any) => {
        // 결과 데이터를 NewData 타입으로 단언합니다.
        // const newData = JSON.parse(responseData.data);
        console.log('짜잔', responseData);
        navigation(responseData);
      },
      onError: error => {
        // 요청 실패 시 처리할 작업
        console.error(
          'PloggingResultModal- onError 요청이 실패했습니다.',
          error,
        );
      },
    },
  );

  // 서버 요청을 실행하는 함수
  const handlePloggingResult = () => {
    // activityData 전체를 전송해야 합니다.
    if (activityData) {
      mutation.mutate(activityData);
    } else {
      console.log('activityData 없음', activityData);
    }
  };

  const topContent = activityData ? (
    <View style={styles.overlayContainer}>
      <AppText style={styles.overlayText}>오늘도 주섬주섬 성공!</AppText>
      <Image
        source={{uri: `file://${activityData.activityImg}`}}
        style={styles.overlayImage}
      />
    </View>
  ) : null;

  const Item = ({title, img}: TrashList) => (
    <View style={styles.ItemContainer}>
      <Image style={styles.ItemImage} source={img} />
      <View style={styles.ItemAlign}>
        <AppText style={styles.ItemText}>{title}</AppText>
      </View>
    </View>
  );
  // console.log(activityData);

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
        <AppButton variant={'ploggingRST'} onPress={handlePloggingResult}>
          결과 보기
        </AppButton>
      </ModalComponent>
    </>
  );
};

export default PloggingResultModal;
