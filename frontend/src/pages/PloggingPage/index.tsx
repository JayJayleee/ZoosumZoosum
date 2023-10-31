import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {PloggingScreenProps} from 'typePath';
import ModalComponent from '@/components/ui/Modal';
import {styles} from './styles';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
// import {StyleSheet} from 'react-native';

export default function PloggingPage({navigation, route}: PloggingScreenProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.shouldOpenModal === true) {
      setModalVisible(true);
    }
  }, [route.params]);

  return (
    <View style={{flex: 1}}>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        buttonInnerText={'닫기'}>
        <View>
          <Text>여기는 모달</Text>
        </View>
      </ModalComponent>

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <AppButton
            children="플로깅 완료하기"
            onPress={() => navigation.navigate('PloggingResult')}
          />
        </View>
        <ImageBackground
          style={styles.bottomContainer}
          source={require('@/assets/plogingpage_image/Background.png')}
          resizeMode="contain">
          <View style={styles.textContainer}>
            <AppText style={styles.text}>3 km</AppText>
            <AppText style={styles.text}>00:00:00</AppText>
            <AppText style={styles.text}>10개</AppText>
          </View>

          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={() => navigation.navigate('Camera')}>
            <Image
              source={require('@/assets/plogingpage_image/cameraBtn.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}
