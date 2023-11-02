import React, {ReactNode} from 'react';
import {ModalProps as RNModalProps} from 'react-native';
import {Modal, TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';

interface ModalComponentProps
  extends Partial<
    Pick<RNModalProps, 'animationType' | 'transparent' | 'onRequestClose'>
  > {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonInnerText: String;
}

//  isVisible={isModalVisible(해당 페이지에서 모달 보여줄 지 결정할 요소)},onClose={() => setModalVisible(false)}, onRequestClose={() => setModalVisible(false)}
// 위 세가지 항목은 필수로 들어가야 함.
// 또한 본문은 넣고 싶은 것 넣으면 children props로 알아서 들어감. 다만 가장 상위 wrapper를 꼭 만들 것!

export default function ModalComponent({
  isVisible,
  onClose,
  children,
  animationType = 'slide', // 기본값을 'slide'로 설정
  transparent = true, // 기본값을 true로 설정
  onRequestClose,
  buttonInnerText,
}: ModalComponentProps) {
  return (
    <Modal
      transparent={transparent}
      animationType={animationType}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.textStyle}>{buttonInnerText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
