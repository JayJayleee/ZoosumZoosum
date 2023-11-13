import React, {useEffect, useRef, useState} from 'react';
import {View, Platform, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import haversine from 'haversine';
import AppText from '../../Text';
import FastImage from 'react-native-fast-image';
import Spinner from '../../Spinner';

// type defined
type latLng = {
  latitude: number;
  longitude: number;
};
type GoogleMapProps = {
  endPlog: boolean; // 플로깅 종료여부
  animalImg: string; // 동물 이미지
  trashCount: number; // 주운 쓰레기 개수 변화 감지
  setMapLoading: Function;
  setPloggingDistance: Function; // 거리 변동 감지
};
type marker = {
  id: number;
  coordinate: latLng;
};

// 위치 정보 수집 권한 요청
async function requestPermission() {
  try {
    // Android
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '위치 권한 사용을 허가해주세요.',
          buttonNeutral: '나중에',
          buttonNegative: '취소',
          buttonPositive: '수락',
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
    latitude: 36.355,
    longitude: 127.2983,
    latitudeDelta: 2,
    longitudeDelta: 2,
  });
  // 이전위치
  const prevLatLng = useRef<latLng>({
    latitude: 36.355,
    longitude: 127.2983,
  });
  // 위치 이동 파악
  let watchId: number = 0;
  // 위치 이동 경로 저장
  const posirouteCoordinates = useRef<latLng[]>([]);
  // 이동거리
  const distanceTravelled = useRef<number>(0);
  // 에러메세지
  const [errorMsg, setErrorMsg] = useState<string>('');
  // 준비여부
  const imReady = useRef<boolean>(false);
  // 주운 쓰레기 개수
  const captureTrashCount = useRef<number>(0);
  // 마커 정보를 배열로 정의
  const markers = useRef<marker[]>([]);
  // 마커 이미지 소스 정의
  const markerImage = require('@/assets/img_icon/trash_marker_icon.png');
  // 동물 이미지 소스 정의
  const animalImage = {uri: props.animalImg};

  // 거리 계산 함수
  const calcDistance = async (newLatLng: latLng) => {
    console.log('6 calculate distance');
    return haversine(prevLatLng.current, newLatLng, {unit: 'meter'}) || 0;
  };

  const addDistance = async (newLatLng: latLng) => {
    await calcDistance(newLatLng)
      .then(distance => {
        console.log('7 add distance');
        distanceTravelled.current += distance;
        // 상위 컴포넌트에 전달
        console.log('8 set plogging distance to up');
        props.setPloggingDistance(
          Math.floor((Math.floor(distanceTravelled.current) / 1000) * 100) /
            100,
        );
      })
      .catch(err => console.log(err));
  };

  const getPosition = async () => {
    console.log('getPosition');
    await myCurrnetPosition();
    await myWatchPosition();
  };

  // 현재 위치 가져오기
  const myCurrnetPosition = async () => {
    // console.log('myCurrnetPosition');
    // 현재 위치 받아오기
    Geolocation.getCurrentPosition(
      // 성공
      pos => {
        imReady.current = true;
        console.log('3 get current position');
        // console.log(pos);
        const {latitude, longitude} = pos.coords;
        // 과거위치 변경
        prevLatLng.current = {latitude: latitude, longitude: longitude};
      },
      // 실패
      error => {
        console.log(error, error.message);
      },
      // 옵션
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  // 위치 지켜보기
  const myWatchPosition = async () => {
    watchId = Geolocation.watchPosition(
      // 성공
      pos => {
        console.log('4 watch position');
        const {latitude, longitude} = pos.coords;
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
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
        fastestInterval: 2000,
      },
    );
  };

  // 최초 1회 현재위치 설정
  useEffect(() => {
    console.log('1 init useEffect');
    // console.log('endPlog', props.endPlog);
    // 플로깅 끝나면 위치 이동 중지
    Geolocation.clearWatch(watchId);

    console.log(watchId, 'watchId');

    // 권한 확인 후, 위치 설정
    requestPermission().then(result => {
      console.log('2 permission');
      // console.log({result});
      // 허가받지 못한 경우 에러메세지
      if (result !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return;
      }
    });
  }, []);

  // region이 변경되었을 때 나머지 데이터들도 갱신
  useEffect(() => {
    console.log('5 renew region');
    console.log('region', region);
    const newCoordinate: latLng = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    // 위치배열갱신 -> 이동경로 그려줌
    console.log('5.5 renew position array. this is use to polyline');
    posirouteCoordinates.current = [
      ...posirouteCoordinates.current,
      newCoordinate,
    ];

    if (posirouteCoordinates.current.length === 2) {
      posirouteCoordinates.current[0] = posirouteCoordinates.current[1];
      prevLatLng.current = newCoordinate;
      distanceTravelled.current = 0;
    }

    // 거리 더하기
    addDistance(newCoordinate);

    // 과거위치 변경
    setTimeout(() => {
      console.log('10 past position change');
      prevLatLng.current = newCoordinate;
    }, 1000);
  }, [region]);

  // 사진을 찍었을 때, 현재 위치에 쓰레기 이미지 마커를 찍는다.
  useEffect(() => {
    // console.log('12 capture trash');
    if (captureTrashCount.current === props.trashCount) return;
    captureTrashCount.current = props.trashCount;
    // console.log('12 capture trash do do do');
    const newMarker: marker = {
      id: markers.current.length + 1,
      coordinate: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    };
    markers.current = [...markers.current, newMarker];
  }, [props.trashCount]);

  // 페이지 로딩
  // if (!imReady.current) {
  //   return <Spinner />;
  // }

  // console.log('####### imReady ########', imReady.current);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapContent}
        rotateEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={region}
        onMapReady={e => {
          getPosition();
          props.setMapLoading(true);
        }}>
        {/* 주운 쓰레기 목록 마커 */}
        {markers.current.map(marker => (
          <Marker key={marker.id} coordinate={marker.coordinate}>
            <FastImage source={markerImage} style={styles.trash} />
          </Marker>
        ))}
        {/* 내가 고른 동물 마커 */}
        <Marker
          key={0}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}>
          <FastImage source={animalImage} style={styles.animal} />
        </Marker>
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
