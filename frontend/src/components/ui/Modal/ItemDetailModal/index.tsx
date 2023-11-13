import ModalComponent from "..";
import { View } from 'react-native';
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

type ItemDetailProps = {
  isImageModalOpen: boolean;
  closeFnt: () => void;
  imageURL: string;
  itemType: string;
}

export const ItemDetailModal = ({isImageModalOpen, closeFnt, imageURL, itemType}: ItemDetailProps) => {

  const getResizeMode = () => {
    return itemType === 'TREE' ? FastImage.resizeMode.cover : FastImage.resizeMode.stretch;
  };
  const getStyle = () => {
    return itemType === 'TREE' ? styles.imageModal : styles.imageModal2
  }

  return <ModalComponent
    isVisible={isImageModalOpen}
    onClose={closeFnt}
    onRequestClose={closeFnt}
    buttonInnerText={"확인"}
    ViewStyle='activity'
    btnVariant='activity'>
    <View>
      <FastImage style={getStyle()} source={{ uri: imageURL }} resizeMode={getResizeMode()}/>
    </View>
  </ModalComponent>
};