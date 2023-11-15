import * as React from 'react';
// import styles from './app.ts';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {replay, stop, whoosh} from '@/constants/sound';
import {pause} from '@/constants/sound';

// react-native-screens에 에러가 나서 아래 구문을 추가해줌
import {enableScreens} from 'react-native-screens';
enableScreens();

// type 가져오기
import {RootStackParamList} from 'typePath';

// api 호출을 위한 queryClient, QueryClientProvider 추가
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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
import ProfilePage from '@/pages/ProfilePage';
import RankingPage from '@/pages/RankingPage';

import ItemListPage from '@/pages/ItemListPage';
import PickIslandPage from '@/pages/PickIslandPage';
import PickTreePage from '@/pages/PickITreePage';
import FriendDetailPage from '@/pages/FriendDetailPage';
import {useEffect} from 'react';
import {PermissionsAndroid, TextInput, Text} from 'react-native';

import TutorialPage from '@/pages/TutorialPage';
import FirstEggPage from '@/pages/FirstEggPage';

import {AppState, AppStateStatus} from 'react-native';
// 여기서는 RootStackParamList 안에 있는 타입 지정 안해주면 에러남~!꼭 넣을 것
const Stack = createNativeStackNavigator<RootStackParamList>();
// QueryClient 선언
const queryClient = new QueryClient();
// Enable playback in silence mode
// Sound.setCategory('Playback');

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

function App() {
  whoosh;

  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        replay();
      } else if (nextAppState === 'background') {
        pause();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* initialRouteName 는 가장 처음 나타나는 화면을 의미한다 */}
        <Stack.Navigator
          initialRouteName="Login"
          // 아래 코드 넣으면 뒤로가기 바가 있는 헤더가 사라짐
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Tutorial" component={TutorialPage} />
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
          <Stack.Screen name="ItemList" component={ItemListPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="Ranking" component={RankingPage} />
          <Stack.Screen name="PickIsland" component={PickIslandPage} />
          <Stack.Screen name="PickTree" component={PickTreePage} />
          <Stack.Screen name="FriendDetail" component={FriendDetailPage} />
          <Stack.Screen name="FirstEgg" component={FirstEggPage} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Toast /> */}
    </QueryClientProvider>
  );
}
export default App;
