import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// react-native-screens에 에러가 나서 아래 구문을 추가해줌
import {enableScreens} from 'react-native-screens';
enableScreens();

//page
import MainPage from './src/pages/MainPage';
import PloggingPage from './src/pages/PloggingPage';
import CameraPage from './src/pages/CameraPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName 는 가장 처음 나타나는 화면을 의미한다 */}
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Plogging" component={PloggingPage} />
        <Stack.Screen name="Camera" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
