import * as React from 'react';
// import styles from './app.ts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';

// react-native-screens에 에러가 나서 아래 구문을 추가해줌
import {enableScreens} from 'react-native-screens';
enableScreens();

// type 가져오기
import {RootStackParamList} from 'typePath';

//page 가져오기
import MainPage from '@/pages/MainPage';
import PloggingPage from '@/pages/PloggingPage';
import CameraPage from '@/pages/CameraPage';
import LoginPage from '@/pages/LoginPage';

import PloggingResultPage from '@/pages/PloggingResultPage';
import UserInfoPage from '@/pages/UserInfoPage';

import FriendListPage from '@/pages/FriendListPage';
import PickFriendPage from '@/pages/PickFriendPage';
import PickPloggingFriendPage from '@/pages/PickPloggingFriendPage';

// 여기서는 RootStackParamList 안에 있는 타입 지정 안해주면 에러남~!꼭 넣을 것
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName 는 가장 처음 나타나는 화면을 의미한다 */}
      <Stack.Navigator
        initialRouteName="Login"
        // 아래 코드 넣으면 뒤로가기 바가 있는 헤더가 사라짐
        // screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Plogging" component={PloggingPage} />
        <Stack.Screen name="PloggingResult" component={PloggingResultPage} />
        <Stack.Screen name="Camera" component={CameraPage} />
        <Stack.Screen name="FriendList" component={FriendListPage} />
        <Stack.Screen name="UserInfo" component={UserInfoPage} />
        <Stack.Screen name="PickFriend" component={PickFriendPage} />
        <Stack.Screen
          name="PickPloggingFriend"
          component={PickPloggingFriendPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
