import * as React from 'react';
// import styles from './app.ts';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Sound from 'react-native-sound';
import { whoosh } from '@/constants/sound';

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
import {PermissionsAndroid} from 'react-native';

import TutorialPage from '@/pages/TutorialPage';
import FirstEggPage from '@/pages/FirstEggPage';

// 여기서는 RootStackParamList 안에 있는 타입 지정 안해주면 에러남~!꼭 넣을 것
const Stack = createNativeStackNavigator<RootStackParamList>();
// QueryClient 선언
const queryClient = new QueryClient();
// Enable playback in silence mode
// Sound.setCategory('Playback');

function App() {
  whoosh;

  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  // const whoosh = new Sound('zoosum.mp3', Sound.MAIN_BUNDLE, error => {
  //   if (error) {
  //     console.log('failed to load the sound', error);
  //     return;
  //   }
  //   // loaded successfully
  //   // console.log(
  //   //   'duration in seconds: ' +
  //   //     whoosh.getDuration() +
  //   //     'number of channels: ' +
  //   //     whoosh.getNumberOfChannels(),
  //   // );

  //   // Play the sound with an onEnd callback
  //   whoosh.play(success => {
  //     if (success) {
  //       console.log('successfully finished playing');
  //     } else {
  //       console.log('playback failed due to audio decoding errors');
  //     }
  //   });
  // });

  // // Reduce the volume by half
  // whoosh.setVolume(0.8);

  // // Position the sound to the full right in a stereo field
  // whoosh.setPan(1);

  // // Loop indefinitely until stop() is called
  // whoosh.setNumberOfLoops(-1);

  // // Get properties of the player instance
  // // console.log('volume: ' + whoosh.getVolume());
  // // console.log('pan: ' + whoosh.getPan());
  // // console.log('loops: ' + whoosh.getNumberOfLoops());

  // // Seek to a specific point in seconds
  // whoosh.setCurrentTime(2.5);

  // // Get the current playback point in seconds
  // whoosh.getCurrentTime(seconds => console.log('at ' + seconds));

  // // Pause the sound
  // // whoosh.pause();

  // // Stop the sound and rewind to the beginning
  // whoosh.stop(() => {
  //   // Note: If you want to play a sound after stopping and rewinding it,
  //   // it is important to call play() in a callback.
  //   whoosh.play();
  // });

  // // Release the audio player resource
  // whoosh.release();

  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
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
