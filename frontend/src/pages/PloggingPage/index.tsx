import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  AppState,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {PloggingScreenProps} from 'typePath';
import {TrashList} from '@/types/plogging';
import TrashModal from '@/components/ui/Modal/TrashModal';
import {styles} from './styles';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import GoogleMap from '@/components/ui/Map/GoogleMap';
import ViewShot from 'react-native-view-shot';
// import CameraRoll from '@react-native-community/cameraroll';
import {DATA} from './TrashImageList';
import PloggingResultModal from '@/components/ui/Modal/PloggingResultModal';
// import {StyleSheet} from 'react-native';

export default function PloggingPage({navigation, route}: PloggingScreenProps) {
  // 모달 관리 값
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // 종료 여부
  let endPlog: boolean = false;

  // 모달 여는 부분. params로 함수 받아와서 그 값에 따라 모달 연다.
  useEffect(() => {
    if (route.params?.shouldOpenModal === true) {
      setModalVisible(true);
    }
  }, [route.params]);
  const [resultData, setResultData] = useState<TrashList[]>();
  const [ploggingDistance, setPloggingDistance] = useState(0);
  const [trashCount, setTrashCount] = useState(0);
  const [timer, setTimer] = useState<number>(0);

  // --------------------------------------------  타이머 기능을 위한 변수  --------------------------------------------

  // 타이머 기능을 위한 값
  const [appState, setAppState] = useState(AppState.currentState);
  const [backgroundTime, setBackgroundTime] = useState<number | null>(null);

  //컴포넌트의 전체 라이프 사이클에 영향없는 시간 값 만들기
  let intervalRef = useRef<number | null>(null);
  const handleAppStateChange = (nextAppState: typeof appState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // 앱이 백그라운드에서 포그라운드로 전환될 때
      const currentTime = Date.now();
      if (backgroundTime) {
        const diffTime = Math.floor((currentTime - backgroundTime) / 1000); // 초 단위
        setTimer(prevTimer => prevTimer + diffTime);
      }
    } else if (
      nextAppState.match(/inactive|background/) &&
      appState === 'active'
    ) {
      // 앱이 포그라운드에서 백그라운드로 전환될 때
      setBackgroundTime(Date.now());
    }
    setAppState(nextAppState);
  };

  // 사용자의 앱 사용 상태에 따른 타이머 기능 함수
  useEffect(() => {
    // 앱이 포그라운드 상태일 때 타이머 시작
    if (appState === 'active') {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000) as unknown as number;
    }

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      // 컴포넌트가 언마운트되거나 앱 상태가 변경될 때 타이머 정지
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      appStateSubscription.remove();
    };
  }, [appState]);

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

  //플로깅 완료 시 작동될 로직.

  const stopAndResetTimer = () => {
    // 플로깅 종료 신호 넘겨주기
    endPlog = false;

    // 타이머 멈추기
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // 현재 상태로 resultList 생성
    setResultData([
      {
        img: require('@/assets/img_icon/sand_clock_icon.png'),
        title: formatTime(timer),
      },
      {img: require('@/assets/img_icon/trash_icon.png'), title: trashCount},
      {
        img: require('@/assets/img_icon/shoe_icon.png'),
        title: ploggingDistance,
      },
    ]);

    console.log('총 플로깅 시간', formatTime(timer));
    setIsEndModalVisible(true);
    // 타이머 리셋
    setTimer(0);

    // 스크린샷 찍기
    onCapture();

    // resultList를 PloggingResult 페이지로 전달하며 네비게이트
    // navigation.navigate('PloggingResult');
    //, { resultList: currentResultList }
  };

  const resultNav = () => {
    navigation.navigate('PloggingResult', {resultList: resultData});
  };

  // --------------------------------------------  스크린샷 기능을 위한 변수  --------------------------------------------

  const captureRef = useRef<ViewShot | null>(null);
  const now = new Date();
  const fileName = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}`;

  const getPhotoUri = async (): Promise<string> => {
    if (!captureRef.current) {
      console.log('captureRef is null or undefined');
      return '';
    } else if (!captureRef.current.capture) {
      console.log('captureRef is null or undefined');
      return '';
    } else {
      const uri = await captureRef.current.capture();
      console.log('👂👂 Image saved to', uri);
      return uri;
    }
  };

  // 스크린샷 찍기
  const onCapture = async () => {
    try {
      const uri = await getPhotoUri();
      const options = {
        title: 'Share Title',
        message: 'Share Message',
        url: uri,
        type: 'image/jpeg',
      };
    } catch (e) {
      console.log('😻😻😻 snapshot failed', e);
    }
  };

  /* 
  // Android 저장 요청
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  // 갤러리 저장
  const onSave = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      console.log('갤러리 접근 권한이 없어요');
      return;
    }

    const uri = await getPhotoUri();
    const result = await CameraRoll.save(uri);
    console.log('갤러리 result', result);
  };
  */

  return (
    <View style={{flex: 1}}>
      <TrashModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        data={DATA}
        navigation={navigation}
      />
      <PloggingResultModal
        isVisible={isEndModalVisible}
        onClose={() => setIsEndModalVisible(false)}
        data={resultData}
        navigation={resultNav}
      />

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <AppButton children="플로깅 완료하기" onPress={stopAndResetTimer} />
        </View>
        <ImageBackground
          style={styles.bottomContainer}
          source={require('@/assets/plogingpage_image/Background.png')}
          resizeMode="contain">
          <View style={styles.textContainer}>
            <AppText style={styles.text}>{ploggingDistance}km</AppText>
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
        <ViewShot
          style={styles.mapContainer}
          ref={captureRef}
          options={{fileName: fileName, format: 'jpg', quality: 0.9}}>
          <GoogleMap
            endPlog={endPlog}
            setPloggingDistance={setPloggingDistance}></GoogleMap>
        </ViewShot>
      </View>
    </View>
  );
}
