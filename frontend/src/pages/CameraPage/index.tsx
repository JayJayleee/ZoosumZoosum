import React, {useEffect, useState, useRef, RefObject} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {CamerascreenProps} from '../../types/path';
import {AppState, AppStateStatus} from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import {useMutation} from '@tanstack/react-query';
import {TrashImgResultReturnFtn} from '@/apis/plogging';
import {Wave} from '@/components/ui/animation/LottieEffect';
import KeyEvent from 'react-native-keyevent';
import {changeButtonSound} from '@/constants/sound';

interface Photo {
  path: string;
}

export default function CameraPage({navigation, route}: CamerascreenProps) {
  const AnimalImage = route.params.getAnimalIMG;
  // console.log('가젤', AnimalImage);
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  // device.back으로 작성이 안됨... 확인해보기
  const device = devices[0];

  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [imageSource, setImageSource] = useState<any>('');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(false);

  // 만약 설정 중 사용자가 앱을 껐거나, 백그라운드로 넘어갔을 때
  // 이 부분 설정 더 알아보기
  const [appState, setAppState] = useState<
    'active' | 'background' | 'inactive' | 'unknown' | 'extension'
  >(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    const updatePermission = async () => {
      const permission = await Camera.getCameraPermissionStatus();
      setCameraPermission(permission === 'granted');
    };

    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      updatePermission();
    }
    if (
      ['active', 'background', 'inactive', 'unknown', 'extension'].includes(
        nextAppState,
      )
    ) {
      setAppState(nextAppState);
    }
  };

  useEffect(() => {
    async function checkPermission() {
      const permission = await Camera.getCameraPermissionStatus();
      // 일단 카메라 화면으로 들어오면, 권한 허용 여부를 확인함.

      switch (permission) {
        // 기본 상태는 denied, 이때 허용 요청을 한다.
        case 'denied':
          await Camera.requestCameraPermission();
          // 허용 요청 후, 다시 권한 확인. 만약 허용 상태하면 카메라가 켜지게 만든다.
          // 현재까지는 바로 켜지지 않아서 허용후 최초 1회는 한 번 껐다가 켜짐
          const newPermission = await Camera.getCameraPermissionStatus();
          if (newPermission === 'granted') {
            setShowCamera(false);
            setShowCamera(true);
          } else if (newPermission === 'denied') {
            console.log('최초 허용 요청 - 거부됨:', {newPermission});
            await Linking.openSettings();
          }
          break;
        // 허용 후의 상태. 바로 카메라가 켜짐
        case 'granted':
          setShowCamera(true);
          break;
        // 최초 요청 시 허용을 누르지 않았거나 뒤로가기 했을때의 상태.
        case 'not-determined':
          const notDetermindCameraPermission =
            await Camera.requestCameraPermission();
          // 허용 상태에 따라 카메라를 키거나, 혹은 바로 설정 페이지로 이어짐
          // 다시 허용 요청만 무한대로 켜질 수 없으니 설정 페이지로 이은 것.
          // TODO: 안드로이드 자체 알림으로 권한 허용 필요하다는 알림
          if (notDetermindCameraPermission === 'granted') {
            setShowCamera(false);
            setShowCamera(true);
          } else if (notDetermindCameraPermission === 'denied') {
            await Linking.openSettings();
          }
          break;
      }
    }
    checkPermission();
  }, []);
  useEffect(() => {
    if (imageSource !== '') {
      console.log('업데이트된 소스:', `{uri:${imageSource}}`);
    }
  }, [imageSource]);
  // 아예 permission이 생기지 않은 경우를 상정. 최초 denied
  if (!device || cameraPermission === false) {
    Linking.openSettings();
  }

  const mutation = useMutation(
    (imageSource: string) =>
      TrashImgResultReturnFtn(imageSource, 3, 2000, setIsLoading),
    {
      onMutate: () => {
        setIsLoading(true); // 요청 시작 시 로딩 시작
      },
      onSuccess: async (responseData: any) => {
        setIsLoading(false);
        // console.log('쓰레기 이미지가 보내지긴 했어요...일단', responseData);

        await new Promise(resolve => setTimeout(resolve, 0)); // 이벤트 루프를 기다리게 함
        navigation.navigate('Plogging', {
          shouldOpenModal: true,
          TrashData: responseData.predictResult,
          TrashImg: responseData.decodedImage,
          TrashStatus: responseData.status,
        });
      },
      onError: (error: any) => {
        setIsLoading(false);
        console.error('쓰레기 이미지- onError 요청이 실패했습니다.', error);
        navigation.navigate('Plogging', {
          shouldOpenErrModal: true,
        });
      },

      onSettled: () => {
        setIsLoading(false);
      },
    },
  );
  // 볼륨 버튼으로 인한 촬영 상태 관리
  const [isCapturing, setIsCapturing] = useState(false);
  const lastKeyEventTime = useRef<Date | null>(null);
  const debounceTime = 5000;

  const capturePhoto = async () => {
    if (isCapturing) {
      // 이미 촬영 중이면 더 이상의 촬영 명령을 무시함
      return;
    }

    setIsCapturing(true);
    changeButtonSound();
    if (camera.current) {
      const photoOptions = {
        enableShutterSound: false,
      };
      const photo: Photo = await camera.current.takePhoto(photoOptions);

      setImageSource(`file://${photo.path}`);

      setShowCamera(false);
      // await storeImage(photo.path); // 이미지 경로 저장
    }
  };

  // 서버 요청을 실행하는 함수
  useEffect(() => {
    if (imageSource) {
      mutation.mutate(imageSource);
      setIsCapturing(false);
    } else {
      console.log('TrashImg 없음', imageSource);
      setIsCapturing(false);
    }
  }, [imageSource]);

  const handleVolumeButtonPress = () => {
    const now = new Date();
    if (lastKeyEventTime.current) {
      const diff = now.getTime() - lastKeyEventTime.current.getTime();
      if (diff < debounceTime) {
        // 짧은 시간 내에 다시 눌린 경우 무시
        return;
      }
    }
    lastKeyEventTime.current = now; // 마지막 키 이벤트 시간 업데이트
    capturePhoto();
  };

  useEffect(() => {
    // 볼륨 버튼 이벤트 리스너 등록
    KeyEvent.onKeyDownListener((keyEvent: any) => {
      if (keyEvent.keyCode === 25 || keyEvent.keyCode === 24) {
        handleVolumeButtonPress();
      }
    });

    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading && (
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'flex-end',
            width: '90%',
            height: '80%',
            marginBottom: '3%',
            borderWidth: 3,
            borderColor: 'white',
            borderRadius: 10,
            zIndex: 1,
            borderStyle: 'dashed',
          }}>
          {!isLoading && (
            <View style={styles.overlayContainer}>
              {/* 왼쪽 이미지 */}
              <Image source={{uri: AnimalImage}} style={styles.overlayImage} />

              <Image
                source={{uri: 'https://i.imgur.com/7CbpjWi.png'}}
                style={styles.overlayRightImage}
              />
              <AppText style={styles.overlayText}>
                박스에 쓰레기를 맞춰주세요!
              </AppText>
            </View>
          )}
        </View>
      )}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={showCamera}
        photo={true}
      />
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Wave />
          <AppText style={{color: 'white', fontSize: 20}}>
            쓰레기 속 정령들을 찾는 중...
          </AppText>
        </View>
      )}

      {!isLoading && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.camButton} onPress={capturePhoto} />
        </View>
      )}
    </View>
  );
}
