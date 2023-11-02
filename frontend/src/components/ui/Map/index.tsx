import React, {useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../Text';
import styles from './styles';


export function PloggingMap() {

    // JavaScript 키: aa4620ad0a2c30eb092a5ad58e2fdd02
    const src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa4620ad0a2c30eb092a5ad58e2fdd02"
    
    useEffect(() => {
        loadScript;
        loadMap;
    }, []);

    // api 불러오기
    // ref https://devtalk.kakao.com/t/referenceerror-kakao-is-not-defined/124886
    const loadScript = () => {
        const script = document.createElement("script");
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          "aa4620ad0a2c30eb092a5ad58e2fdd02" +
          "&autoload=false";
        document.head.appendChild(script);
        script.onload = () => {
          window.kakao.maps.load(this.loadMap);
        };
      };

      // 맵 출력하기
      const loadMap = () => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        this.map = new window.kakao.maps.Map(container, options);
        // this.loadMarker();
      };

  return (
    <View id="map" style={styles.container}>
    </View>
  );
}
