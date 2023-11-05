import React, {useEffect, useState} from 'react';
import {View, Platform, PermissionsAndroid} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import ViewShot from 'react-native-view-shot';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';
import AppText from '../../Text';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import Button from '../../Button';

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

// 위치 정보 수집 권한 요청
async function requestPermission() {
  try {
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    // if (Platform.OS === 'ios') {
    //   return await Geolocation.requestAuthorization('always');
    // }
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

export default function GoogleMap(props: any) {
  const [location, setLocation] = useState<latLong>({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  // const [position, setPosition] = useState<position>();
  useEffect(() => {
    requestPermission().then(result => {
      console.log({result});
      if (result === 'granted') {
        console.log('get CurrentPosition');
        Geolocation.getCurrentPosition(
          // success callback
          pos => {
            console.log(pos);
            if (location.latitude === LATITUDE) {
              // 기본 설정일 경우 positoin.coords의 lat, long 값을 세팅
              setLocation(pos.coords);
            }
          },
          error => {
            console.log(error, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
    });
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
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          style={{borderColor: 'black'}}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
      {/* <ViewShot
        style={styles.container}
        ref="viewShot"
        options={{format: 'jpg', quality: 0.9}}>
        <View>
          <Button
            style={styles.}
            title="Capture and Share"
            onPress={this.captureAndShareScreenshot}
          />
        </View>
      </ViewShot> */}
    </View>
  );
}
