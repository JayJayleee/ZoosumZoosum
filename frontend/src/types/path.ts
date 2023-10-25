// navigation 사용 시 필요한 타입을 모아둔 페이지

import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: any;
  Plogging: any;
  Camera: any;
};

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Main'
>;

export type PloggingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Plogging'
>;

export type CameracreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Camera'
>;
