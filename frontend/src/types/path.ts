// navigation 사용 시 필요한 타입을 모아둔 페이지

import {NativeStackScreenProps} from '@react-navigation/native-stack';

// 해당 리스트는 각 페이지 네임에 해당하는 route 받을 때 그 route를 통해 전달하는 params의 타입을 의미함. 아무것도 안 줄 거면 일단 UNDEFINED
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Plogging: {
    shouldOpenModal?: boolean;
  };
  Camera: undefined;
  PloggingResult: undefined;
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
