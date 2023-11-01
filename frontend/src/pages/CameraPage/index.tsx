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

interface Photo {
  path: string;
}

export default function CameraPage({navigation, route}: CamerascreenProps) {
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  // device.back으로 작성이 안됨... 확인해보기
  const device = devices[0];

  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [imageSource, setImageSource] = useState<string>('');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );

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

  // 아예 permission이 생기지 않은 경우를 상정. 최초 denied
  if (!device || cameraPermission === false) {
    Linking.openSettings();
  }

  const capturePhoto = async () => {
    if (camera.current) {
      const photoOptions = {
        enableShutterSound: false, // 셔터 소리 끄기
      };
      const photo: Photo = await camera.current.takePhoto(photoOptions);
      setImageSource(photo.path);
      setShowCamera(false);
      navigation.navigate('Plogging', {shouldOpenModal: true});
      // console.log(photo.path);
    }
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />
          <View style={styles.overlayContainer}>
            {/* 왼쪽 이미지 */}
            <Image
              source={{uri: 'https://i.imgur.com/Rr9HDQw.png'}}
              style={styles.overlayImage}
            />

            <Image
              source={{uri: 'https://i.imgur.com/7CbpjWi.png'}}
              style={styles.overlayRightImage}
            />
            <Text style={styles.overlayText}> 인생 씁다...씁...후...</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={capturePhoto} />
          </View>
        </>
      ) : (
        // 사진 찍히는지 확인을 위해 넣어둔 코드. 추후 로딩 스피너 혹은 삭제 할 것
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={styles.backButtonStyle}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  Retake
                </Text>
              </TouchableOpacity>
              {/*  촬영후 로직 추가할 것. 현재는 촬영으로 다시 돌아감 */}
              <TouchableOpacity
                style={styles.usePhotoButton}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
