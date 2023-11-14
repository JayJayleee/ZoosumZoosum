import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashDataReturnList} from '@/types/plogging';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/path';
import AppButton from '../../Button';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {containStorage} from '@/apis';

interface TrashErrorModalProps {
  isVisible: boolean;
  onClose: () => void;
}
const TrashErrorModal = ({isVisible, onClose}: TrashErrorModalProps) => {
  return (
    <ModalComponent
      isVisible={isVisible}
      onClose={onClose}
      onRequestClose={onClose}
      buttonInnerText={'닫기'}
      ViewStyle={'trashinfo'}
      noButton={true}>
      <View
        style={{
          width: '100%',
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppText
          style={{
            color: 'black',
            fontFamily: 'NPSfont_bold',
            fontSize: 23,
            marginVertical: 15,
          }}>
          앗! 이런 실수!
        </AppText>
      </View>

      <View
        style={{
          width: '100%',
          height: '89%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            height: '85%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('@/assets/plogingpage_image/ErrorModalImg.png')}
            style={{height: '70%', resizeMode: 'contain'}}
          />
          <AppText
            style={{
              color: 'black',
              fontSize: 20,
              marginTop: 5,
              fontFamily: 'NPSfont_bold',
              textAlign: 'center',
            }}>
            정령이 실수로 {'\n'}사진을 지워버렸어요!
          </AppText>
          <AppText
            style={{
              color: 'black',
              fontSize: 12,
              marginTop: 10,
            }}>
            쓰레기를 다시 한 번 찍어주세요.
          </AppText>
          <View style={{height: '5%'}}></View>
        </View>
        <AppButton onPress={onClose}>돌아가기</AppButton>
      </View>
    </ModalComponent>
  );
};

export default TrashErrorModal;
