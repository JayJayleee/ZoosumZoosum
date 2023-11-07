import React, {useEffect, useRef, useState} from 'react';
import {View, Platform, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import haversine from 'haversine';
import AppText from '../../Text';

// default LATITUDE & LONGITUDE
const LATITUDE: number = 36.35535459523802;
const LONGITUDE: number = 127.29854862890039;

// type defined
type latLng = {
  latitude: number;
  longitude: number;
};
type GoogleMapProps = {
  endPlog: boolean;
  setPloggingDistance: Function;
};

// 위치 정보 수집 권한 요청
async function requestPermission() {
  try {
    // Android
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
    // iOS
    /* 
    if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
    */
  } catch (e) {
    console.log(e);
  }
}

// ########## 구글맵 컴포넌트 ##########
const GoogleMap = (props: GoogleMapProps) => {
  // region
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  // 이전위치
  const prevLatLng = useRef<latLng>({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  // 현재위치
  const curLatLng = useRef<latLng>({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  // 위치 이동 파악
  let watchId: number = 0;
  // 위치 이동 경로 저장
  const posirouteCoordinates = useRef<latLng[]>([]);
  // 이동거리
  const distanceTravelled = useRef<number>(0);
  // 에러메세지
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    // console.log('endPlog', props.endPlog);
    // 플로깅 끝나면 위치 이동 중지
    if (props.endPlog && watchId) {
      return () => {
        Geolocation.clearWatch(watchId);
      };
    }
    // 권한 확인 후, 위치 설정
    requestPermission().then(result => {
      // console.log({result});
      // 허가받지 못한 경우 에러메세지
      if (result !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return;
      }

      // 현재 위치 받아오기
      Geolocation.getCurrentPosition(
        // 성공
        pos => {
          // console.log(pos);
          const {latitude, longitude} = pos.coords;
          prevLatLng.current = {latitude: latitude, longitude: longitude};
          curLatLng.current = {latitude: latitude, longitude: longitude};
          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        },
        // 실패
        error => {
          console.log(error, error.message);
        },
        // 옵션
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });

    // 이동 위치 지켜보기
    watchId = Geolocation.watchPosition(
      // 성공
      pos => {
        const {latitude, longitude} = pos.coords;
        const newCoordinate: latLng = {
          latitude: latitude,
          longitude: longitude,
        };
        // 현재위치 갱신
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        curLatLng.current = {latitude: latitude, longitude: longitude};
        // 거리 더하기
        calcDistance(newCoordinate)
          .then(distance => {
            distanceTravelled.current += distance;
          })
          .catch(err => console.log(err));
        // 상위 컴포넌트에 전달
        props.setPloggingDistance(
          Math.floor((Math.floor(distanceTravelled.current) / 1000) * 100) /
            100,
        );
        // 위치배열갱신 -> 이동경로 그려줌
        posirouteCoordinates.current = [
          ...posirouteCoordinates.current,
          newCoordinate,
        ];
        // 과거위치 변경
        prevLatLng.current = newCoordinate;
      },
      // 실패
      error => {
        console.log(error);
      },
      // 옵션
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 50000,
        fastestInterval: 20000,
      },
    );
  }, []);

  const calcDistance = async (newLatLng: latLng) => {
    // console.log('prevLatLng', prevLatLng.current);
    // console.log('newLatLng', newLatLng);
    return (
      (await haversine(prevLatLng.current, newLatLng, {unit: 'meter'})) || 0
    );
  };

  if (region.latitude === 0) {
    return (
      <View>
        <AppText>잠시만 기다려주세요...</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapContent}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: curLatLng.current.latitude,
          longitude: curLatLng.current.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        onRegionChangeComplete={newRegion => {
          console.log('이동거리:', distanceTravelled.current);
          // console.log('새로운 지도 영역:', newRegion);
        }}>
        <Polyline
          coordinates={posirouteCoordinates.current}
          strokeColor="#2C9261"
          strokeColors={['#7F0000']}
          strokeWidth={10}
        />
      </MapView>
    </View>
  );
};

export default GoogleMap;
