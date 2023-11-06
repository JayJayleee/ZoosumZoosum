import React, {useEffect, useRef, useState} from 'react';
import {View, Platform, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';

// 1. 시작위치 제대로 받아오기

// default LATITUDE & LONGITUDE
const LATITUDE: number = 36.35535459523802;
const LONGITUDE: number = 127.29854862890039;

// type defined
type latLong = {
  latitude: number;
  longitude: number;
};
type position = {
  latitude: number;
  longitude: number;
  routeCoordinates: [];
  distanceTravelled: number;
  prevLatLng: {};
  coordinate: latLong;
};
type GoogleMapProps = {
  endPlog: boolean;
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

// 스크린샷 찍기
// captureScreenshot = () => {
//   this.refs.viewShot.capture().then(uri => {
//     RNFS.readFile(uri, 'base64').then(res => {
//       let urlString = 'data:image/jpeg;base64,' + res;
//       let options = {
//         title: 'Share Title',
//         message: 'Share Message',
//         url: urlString,
//         type: 'image/jpeg',
//       };
//       Share.open(options)
//         .then(res => {
//           console.log(res);
//         })
//         .catch(err => {
//           err && console.log(err);
//         });
//     });
//   });
// };

const GoogleMap = (props: GoogleMapProps) => {
  const [location, setLocation] = useState<latLong>({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  // const [position, setPosition] = useState<position>();

  let watchId: any;

  useEffect(() => {
    console.log('endPlog', props.endPlog);
    if (props.endPlog) {
      return () => {
        if (watchId) {
          Geolocation.clearWatch(watchId);
        }
      };
    }
    requestPermission().then(result => {
      console.log({result});
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
          console.log(pos);
          const {latitude, longitude} = pos.coords;
          setLocation({latitude, longitude});
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
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      // 실패
      error => {
        console.log(error);
      },
      // 옵션
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  }, []);

  // if (!location) {
  //   return (
  //     <View>
  //       <AppText>Splash Screen</AppText>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapContent}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {/* <Marker
          style={{borderColor: 'black'}}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Marker Title"
          description="Marker Description"
        /> */}
      </MapView>
    </View>
  );
};

export default GoogleMap;
