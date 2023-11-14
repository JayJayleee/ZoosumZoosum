import ModalComponent from "..";
import AppText from "../../Text";
import { View } from 'react-native';
import AppButton from "../../Button";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

type closeProps = {
  isModalVisible: boolean;
  RequestClose: () => void;
  exitFtn: () => void;
}

export const SkipModal = ({isModalVisible, RequestClose, exitFtn}: closeProps) => {
  return <ModalComponent
    isVisible={isModalVisible}
    onRequestClose={RequestClose}
    noButton={true}
    buttonInnerText=""
    modalStyle="close"
    ViewStyle="close"
    onClose={RequestClose}>
    <View style={styles.container}>
      <AppText style={styles.title}>
        스킵하시겠습니까?
      </AppText>
      <FastImage source={{uri: "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_3.gif"}} style={styles.animal} resizeMode={FastImage.resizeMode.cover}/>
      <View style={styles.buttonSection}>
        <AppButton children="확인" onPress={exitFtn} variant="close"/>
        <AppButton children="취소" onPress={RequestClose} variant="notclose"/>
      </View>
    </View>
  </ModalComponent>
}