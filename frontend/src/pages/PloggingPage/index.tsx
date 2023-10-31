import React, {useState, useEffect} from 'react';
import {Button, View, Text, Image, TouchableOpacity} from 'react-native';
import {PloggingScreenProps} from 'typePath';
import ModalComponent from '@/components/ui/Modal';
import {styles} from './styles';
import AppText from '@/components/ui/Text';
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
        <Button
          title="플로깅 완료하기"
          onPress={() => navigation.navigate('PloggingResult')}
        />
        <AppText style={styles.text}>시간, 거리를 나타냄</AppText>
        <Image
          style={styles.bottomTap}
          source={require('@/assets/plogingpage_image/Background.png')}
        />
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={() => navigation.navigate('Camera')}>
          <Image source={require('@/assets/plogingpage_image/cameraBtn.png')} />
        </TouchableOpacity>
        {/* <Button
          title="Go to Plogging"
          onPress={() => navigation.navigate('Camera')}
        /> */}
      </View>
    </View>
  );
}
