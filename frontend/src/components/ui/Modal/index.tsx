import React, {ReactNode} from 'react';
import {ModalProps as RNModalProps} from 'react-native';
import {Modal, TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './styles';
import AppButton from '../Button';
import Toast from 'react-native-toast-message';

interface ModalComponentProps
  extends Partial<
    Pick<RNModalProps, 'animationType' | 'transparent' | 'onRequestClose'>
  > {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonInnerText: string;
  modalStyle?: 'top' | 'default';
  noButton?: boolean;
  TopChildren?: ReactNode;
  ViewStyle?: 'default' | 'userInfo' | 'treeInfo';
  btnVariant?: 'default' | 'button';
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
  ViewStyle = 'default',
  btnVariant = 'default',
}: ModalComponentProps) {
  let variantStyle;
  let viewVariantStyle;

  switch (modalStyle) {
    case 'default':
      variantStyle = styles.centeredView;
      break;
    case 'top':
      variantStyle = styles.topView;
      break;
  }

  switch (ViewStyle) {
    case 'default':
      viewVariantStyle = styles.modalView;
      break;
    case 'userInfo':
      viewVariantStyle = styles.userInfo;
      break;
    case 'treeInfo':
      viewVariantStyle = styles.treeinfo;
      break;
  }

  return (
    <Modal
      key={modalStyle}
      transparent={transparent}
      animationType={animationType}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <View style={variantStyle}>
        <Toast />
        {TopChildren}
        <View style={viewVariantStyle}>
          {children}
          {!noButton && (
            // <TouchableOpacity style={styles.button} onPress={onClose}>
            //   <Text style={styles.textStyle}>{buttonInnerText}</Text>
            // </TouchableOpacity>
            <AppButton
              children={buttonInnerText}
              onPress={onClose}
              variant={btnVariant}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
