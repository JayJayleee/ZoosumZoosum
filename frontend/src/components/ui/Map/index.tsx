import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import styles from './styles';

// const {kakao} = window;

class PloggingMap extends Component {
  // JavaScript 키: aa4620ad0a2c30eb092a5ad58e2fdd02
  // src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=aa4620ad0a2c30eb092a5ad58e2fdd02';

  /*
    useEffect(() => {
        loadScript;
        loadMap;
    }, []);
    api 불러오기
    // ref https://devtalk.kakao.com/t/referenceerror-kakao-is-not-defined/124886
    const loadScript = () => {
        const script = document.createElement("script");
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          "aa4620ad0a2c30eb092a5ad58e2fdd02" +
          "&autoload=false";
        document.head.appendChild(script);
        script.onload = () => {
          kakao.maps.load(this.loadMap);
        };
      };

      // 맵 출력하기
      const loadMap = () => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        var map = new kakao.maps.Map(container, options);
        // this.loadMarker();
      };
    */

  render(): React.ReactNode {
    const runFirst = `
      document.body.style.backgroundColor = 'red';
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: 'https://github.com/react-native-webview/react-native-webview',
          }}
          onMessage={event => {}}
          injectedJavaScript={runFirst}
        />
      </View>
    );
  }
}

export default PloggingMap;
