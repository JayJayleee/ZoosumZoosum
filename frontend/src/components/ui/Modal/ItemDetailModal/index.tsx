import ModalComponent from "..";
import { View, Text } from 'react-native';
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

type ItemDetailProps = {
  isImageModalOpen: boolean;
  closeFnt: () => void;
  imageURL: string;
  itemType: string;
  itemName : string;
}

export const ItemDetailModal = ({isImageModalOpen, closeFnt, imageURL, itemType, itemName}: ItemDetailProps) => {

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
    ViewStyle='iteminfo'
    btnVariant='default'>
    <View style={styles.container}>
      <FastImage style={getStyle()} source={{ uri: imageURL }} resizeMode={getResizeMode()}/>
      <Text numberOfLines={1} style={styles.container_text}>{itemName}</Text>
    </View>
  </ModalComponent>
};