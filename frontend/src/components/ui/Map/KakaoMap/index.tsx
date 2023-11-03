import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import AppText from '../../Text';
import WebView from 'react-native-webview';

export default function KakaoMap() {
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://map.kakao.com/'}}
        style={styles.mapContent}
      />
    </View>
  );
}
