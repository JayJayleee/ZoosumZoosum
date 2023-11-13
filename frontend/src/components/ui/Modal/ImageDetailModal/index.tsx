import ModalComponent from "..";
import { View } from 'react-native';
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

type ImageDetailProps = {
  isImageModalOpen: boolean;
  closeFnt: () => void;
  imageURL: string;
}

export const ImageDetailModal = ({isImageModalOpen, closeFnt, imageURL}: ImageDetailProps) => {
  return <ModalComponent
    isVisible={isImageModalOpen}
    onClose={closeFnt}
    onRequestClose={closeFnt}
    buttonInnerText={"확인"}
    ViewStyle='activity'
    btnVariant='activity'>
    <View>
      <FastImage style={styles.imageModal} source={{ uri: imageURL }} />
    </View>
  </ModalComponent>
};