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
  const region = useRef({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  // 이전위치
  const prevLatLng = useRef<latLng>({
    latitude: 0,
    longitude: 0,
  });
  // 현재위치
  const curLatLng = useRef<latLng>({
    latitude: 0,
    longitude: 0,
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
    // console.log('1 init useEffect');
    // console.log('endPlog', props.endPlog);
    // 플로깅 끝나면 위치 이동 중지
    if (props.endPlog && watchId) {
      return () => {
        Geolocation.clearWatch(watchId);
      };
    }
    // 권한 확인 후, 위치 설정
    requestPermission().then(result => {
      // console.log('2 permission');
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
          // console.log('3 get current position');
          // console.log(pos);
          const {latitude, longitude} = pos.coords;
          // 과거위치 변경
          prevLatLng.current = {latitude: latitude, longitude: longitude};
          // 현재위치 갱신
          curLatLng.current = {latitude: latitude, longitude: longitude};
          region.current = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          };
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

      // 이동 위치 지켜보기
      watchId = Geolocation.watchPosition(
        // 성공
        pos => {
          // console.log('4 watch position');
          const {latitude, longitude} = pos.coords;
          // 현재위치 갱신
          curLatLng.current = {latitude: latitude, longitude: longitude};
          region.current = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          };
        },
        // 실패
        error => {
          console.log(error);
        },
        // 옵션
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: 5000,
          // fastestInterval: 2000,
        },
      );
    });
  }, []);

  useEffect(() => {
    if (region.current.latitude === 0) return;
    // console.log('5 renew region');
    // console.log('region', region);
    const newCoordinate: latLng = {
      latitude: region.current.latitude,
      longitude: region.current.longitude,
    };
    // 거리 더하기
    calcDistance(newCoordinate)
      .then(distance => {
        // console.log('10 add distance');
        distanceTravelled.current += distance;
      })
      .catch(err => console.log(err));
    // 상위 컴포넌트에 전달
    // console.log('7 set plogging distance to up');
    props.setPloggingDistance(
      Math.floor((Math.floor(distanceTravelled.current) / 1000) * 100) / 100,
    );
    // 위치배열갱신 -> 이동경로 그려줌
    // console.log('8 renew position array. this is use to polyline');
    posirouteCoordinates.current = [
      ...posirouteCoordinates.current,
      newCoordinate,
    ];
    // 과거위치 변경
    // console.log('9 past position change');
    prevLatLng.current = newCoordinate;
  }, [region.current]);

  // 거리 계산 함수
  const calcDistance = async (newLatLng: latLng) => {
    // console.log('6 calculate distance');
    return (
      (await haversine(prevLatLng.current, newLatLng, {unit: 'meter'})) || 0
    );
  };

  // console.log('11 ordinary space');

  // // 페이지 로딩
  // if (curLatLng.current.latitude === 0) {
  //   return (
  //     <View>
  //       <AppText>잠시만 기다려주세요...</AppText>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapContent}
        region={region.current}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: region.current.latitude,
          longitude: region.current.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        onRegionChangeComplete={newRegion => {
          // console.log('이동거리:', distanceTravelled.current);
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
