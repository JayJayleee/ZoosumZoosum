import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {PloggingScreenProps} from 'typePath';
import {TrashList} from '@/types/plogging';
import ModalComponent from '@/components/ui/Modal';
import {styles} from './styles';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import {DATA} from './TrashImageList';
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

  // Item List

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

  const numColumns = 2;

  return (
    <View style={{flex: 1}}>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        buttonInnerText={'닫기'}>
        <AppText
          style={{
            color: 'black',
            fontFamily: 'NPSfont_bold',
            fontSize: 25,
            marginBottom: 15,
          }}>
          방금 주운 쓰레기
        </AppText>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => <Item title={item.title} img={item.img} />}
          keyExtractor={(_, index) => index.toString()}
          numColumns={numColumns}
        />
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
      </View>
    </View>
  );
}
