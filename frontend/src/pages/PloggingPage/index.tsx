import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {PloggingScreenProps} from '../../types/path';
import ModalComponent from '../../components/ui/Modal';

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
        onRequestClose={() => setModalVisible(false)}>
        <View>
          <Text>여기는 모달</Text>
        </View>
      </ModalComponent>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>여기는 플로깅</Text>
        <Button
          title="Go to Plogging"
          onPress={() => navigation.navigate('Camera')}
        />

        <Button
          title="플로깅 완료하기"
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    </View>
  );
}
