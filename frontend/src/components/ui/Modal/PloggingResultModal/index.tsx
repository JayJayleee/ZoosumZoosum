import React, {useEffect, useState} from 'react';
import AppButton from '../../Button';
import {View, Image, FlatList, BackHandler} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashList} from '@/types/plogging';
import styles from './styles';
import {PloggingResultFtn} from '@/apis/plogging';
import {useMutation} from '@tanstack/react-query';
import {ActivityDataType, NewData} from '@/types/plogging';
import {AppCloseModal} from '../CloseModal';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/path';
import Spinner from '../../Spinner';

interface PloggingResultModalProps {
  isVisible: boolean;
  onClose: () => void;
  data?: TrashList[];
  navigation: (newData: NewData) => void;
  nav?: NavigationProp<RootStackParamList>;
  exitFtn?: () => void;
  animalImg: string;
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
  animalImg,
  exitFtn,
  nav,
}: PloggingResultModalProps) => {
  // useMutation을 사용하여 서버 요청을 관리합니다.
  useEffect(() => {
    const backAction = () => {
      if (nav) {
        if (nav.isFocused()) {
          setCloseModalVisible(true);
          return true;
        } else {
          return false;
        }
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    console.log(activityData, '1 애니멀 아이디 들어옴?');
  }, [data]);

  const mutation = useMutation(
    (activityData: ActivityDataType) => PloggingResultFtn(activityData),
    {
      onSuccess: (responseData: any) => {
        // 결과 데이터를 NewData 타입으로 단언합니다.
        // const newData = JSON.parse(responseData.data);
        console.log('짜잔', responseData);
        navigation(responseData);
        setIsMutationRunning(false);
      },
      onError: error => {
        // 요청 실패 시 처리할 작업
        console.error(
          'PloggingResultModal- onError 요청이 실패했습니다.',
          error,
        );
        setIsMutationRunning(false);
      },
    },
  );

  // 서버 요청을 실행하는 함수
  const [isCloseModalVisible, setCloseModalVisible] = useState<boolean>(false);
  const [isMutationRunning, setIsMutationRunning] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handlePloggingResult = () => {
    if (isMutationRunning) {
      return;
    }

    setIsMutationRunning(true);
    if (activityData) {
      mutation.mutate(activityData);
    } else {
      console.log('activityData 없음', activityData);
    }
  };

  const topContent = activityData ? (
    <View style={styles.overlayContainer}>
      <AppText style={styles.overlayText}>오늘도 주섬주섬 성공!</AppText>
      <Image source={{uri: animalImg}} style={styles.overlayImage} />
      {/* <Image
        source={{uri: activityData.activityImg}}
        style={styles.overlayImage}
      /> */}
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
      {isMutationRunning ? (
        <Spinner /> // 로딩 중일 때 스피너 표시
      ) : (
        <ModalComponent
          isVisible={isVisible}
          onClose={onClose}
          onRequestClose={() => setCloseModalVisible(true)}
          noButton={true}
          buttonInnerText={'닫기'}
          modalStyle="top"
          TopChildren={topContent}>
          {isCloseModalVisible && exitFtn && (
            <AppCloseModal
              isModalVisible={isCloseModalVisible}
              RequestClose={() => setCloseModalVisible(false)}
              exitFtn={exitFtn}
            />
          )}
          <AppText style={styles.Title}>오늘의 플로깅 결과</AppText>
          <FlatList
            data={data}
            renderItem={({item}) => <Item title={item.title} img={item.img} />}
            keyExtractor={(_, index) => index.toString()}
          />
          {showButton && (
            <AppButton variant={'ploggingRST'} onPress={handlePloggingResult}>
              결과 보기
            </AppButton>
          )}
        </ModalComponent>
      )}
    </>
  );
};

export default PloggingResultModal;
