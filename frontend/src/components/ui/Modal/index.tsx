import React, {ReactNode} from 'react';
import {ModalProps as RNModalProps} from 'react-native';
import {Modal, TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './styles';

interface ModalComponentProps
  extends Partial<
    Pick<RNModalProps, 'animationType' | 'transparent' | 'onRequestClose'>
  > {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonInnerText: String;
  modalStyle?: 'top' | 'default';
  noButton?: boolean;
  TopChildren?: ReactNode;
}

//  isVisible={isModalVisible(해당 페이지에서 모달 보여줄 지 결정할 요소)},onClose={() => setModalVisible(false)}, onRequestClose={() => setModalVisible(false)}
// 위 세가지 항목은 필수로 들어가야 함.
// 또한 본문은 넣고 싶은 것 넣으면 children props로 알아서 들어감. 다만 가장 상위 wrapper를 꼭 만들 것!

export default function ModalComponent({
  isVisible,
  onClose,
  children,
  TopChildren,
  animationType = 'slide', // 기본값을 'slide'로 설정
  transparent = true,
  onRequestClose,
  buttonInnerText,
  noButton = false,
  modalStyle = 'default',
}: ModalComponentProps) {
  console.log('Current modalStyle:', modalStyle);
  let variantStyle;

  switch (modalStyle) {
    case 'default':
      variantStyle = styles.centeredView;
      break;
    case 'top':
      variantStyle = styles.topView;
      break;
  }

  console.log('switch modalStyle:', modalStyle);
  return (
    <Modal
      key={modalStyle}
      transparent={transparent}
      animationType={animationType}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <View style={variantStyle}>
        {TopChildren}
        <View style={styles.modalView}>
          {children}
          {!noButton && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.textStyle}>{buttonInnerText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
