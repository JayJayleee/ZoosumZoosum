import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {PloggingScreenProps} from 'typePath';
import ModalComponent from '@/components/ui/Modal';
import {styles} from './styles';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import PloggingMap from '@/components/ui/Map';
// import {StyleSheet} from 'react-native';

export default function PloggingPage({navigation, route}: PloggingScreenProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState<number>(0);

  //컴포넌트의 전체 라이프 사이클에 영향없는 시간 값 만들기
  let intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 모달 여는 부분. params로 함수 받아와서 그 값에 따라 모달 연다.
  useEffect(() => {
    if (route.params?.shouldOpenModal === true) {
      setModalVisible(true);
    }
  }, [route.params]);

  // 타이머
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 시간 포맷 맞추기 위한 상수. 추후 옮길 것
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

  //플로깅 완료 버튼을 위한 로직
  const stopAndResetTimer = () => {
    console.log('총 플로깅 시간', formatTime(timer));
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setTimer(0);

    navigation.navigate('PloggingResult');
  };

  return (
    <View style={{flex: 1}}>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        buttonInnerText={'닫기'}>
        <View>
          <Text>여기는 모달</Text>
        </View>
      </ModalComponent>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <AppButton children="플로깅 완료하기" onPress={stopAndResetTimer} />
        </View>
        <ImageBackground
          style={styles.bottomContainer}
          source={require('@/assets/plogingpage_image/Background.png')}
          resizeMode="contain">
          <View style={styles.textContainer}>
            <AppText style={styles.text}>3 km</AppText>
            <AppText style={styles.text}>{formatTime(timer)}</AppText>
            <AppText style={styles.text}>10개</AppText>
          </View>

          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={() => navigation.navigate('Camera')}>
            <Image
              source={require('@/assets/plogingpage_image/cameraBtn.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
        {/* 지도 import */}
        <PloggingMap></PloggingMap>
      </View>
    </View>
  );
}
