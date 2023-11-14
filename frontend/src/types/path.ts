// navigation 사용 시 필요한 타입을 모아둔 페이지

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TrashList, ActivityDataType, NewData, TrashDaTaList} from './plogging';

// 해당 리스트는 각 페이지 네임에 해당하는 route 받을 때 그 route를 통해 전달하는 params의 타입을 의미함. 아무것도 안 줄 거면 일단 UNDEFINED
export type RootStackParamList = {
  Main: undefined;
  Tutorial: undefined;
  Login: undefined;
  Plogging: {
    shouldOpenModal?: boolean;
    TrashData?: TrashDaTaList;
    selectedAnimalIMG?: string;
    selectedAnimalID?: number;
    TrashImg?: string;
    errorStatus?: number;
  };
  Camera: {
    getAnimalIMG?: string;
  };
  PloggingResult: {
    resultList?: TrashList[];
    activityData?: ActivityDataType;
    newData?: NewData;
  };
  FriendList: undefined;
  UserInfo: undefined;
  PickFriend: undefined;
  PickPloggingFriend: undefined;
  ItemList: undefined;
  Profile: {
    nickname: string;
  };
  Ranking: undefined;

  PickIsland: undefined;
  PickTree: undefined;
  FriendDetail: {
    animalId: number;
  };
  FirstEgg: {
    isFirstLogin?: boolean;
    eggCount?: number;
  };
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Main'
>;

export type PloggingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Plogging'
>;

export type CamerascreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Camera'
>;

export type PloggingResultscreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PloggingResult'
>;

export type FriendListscreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FriendList'
>;

export type UserInfoscreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserInfo'
>;

export type PickFriendscreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PickFriend'
>;

export type PickPloggingFriendscreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PickPloggingFriend'
>;

export type ItemListscreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ItemList'
>;
export type ProfilescreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type RankingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Ranking'
>;

export type PickIslandScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PickIsland'
>;

export type PickTreeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PickTree'
>;

export type FriendDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FriendDetail'
>;

export type TutorialScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Tutorial'
>;

export type FirstEggScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FirstEgg'
>;
