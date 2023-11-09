import ModalComponent from "..";
import AppText from "../../Text";
import { View } from 'react-native';
import AppButton from "../../Button";
import { styles } from "./styles";

type closeProps = {
  isModalVisible: boolean;
  RequestClose: () => void;
  exitFtn: () => void;
}

export const AppCloseModal = ({isModalVisible, RequestClose, exitFtn}: closeProps) => {
  return <ModalComponent
    isVisible={isModalVisible}
    onRequestClose={RequestClose}
    noButton={true}
    buttonInnerText=""
    modalStyle="close"
    ViewStyle="close"
    onClose={RequestClose}>
    <View style={styles.container}>
      <AppText children="앱을 종료하시겠습니까?" style={styles.title} />
      <View style={styles.buttonSection}>
        <AppButton children="확인" onPress={exitFtn} variant="close"/>
        <AppButton children="취소" onPress={RequestClose} variant="notclose"/>
      </View>
    </View>
  </ModalComponent>
}