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
import {CameracreenProps} from '../../types/path';
import {AppState, AppStateStatus} from 'react-native';
import styles from './style';
interface Photo {
  path: string;
}

export default function CameraPage({navigation}: CameracreenProps) {
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  // device.back으로 작성이 안됨... 확인해보기
  const device = devices[0];

  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [imageSource, setImageSource] = useState<string>('');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );

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
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') {
        await Linking.openSettings();
      } else if (permission === 'granted') {
        // 권한이 승인되었을 때, 카메라를 새로고침
        setShowCamera(false); // 카메라를 숨김
        setShowCamera(true); // 카메라를 다시 표시
      }
    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current) {
      const photo: Photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  if (!device || cameraPermission === false) {
    return <Text>카메라 사용 허용 필요</Text>;
  }

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

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={capturePhoto} />
          </View>
        </>
      ) : (
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
