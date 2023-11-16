import ModalComponent from "..";
import { View, Text } from 'react-native';
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import AppButton from "../../Button";

type ItemDetailProps = {
  isImageModalOpen: boolean;
  closeFnt: () => void;
  imageURL: string;
  itemType: string;
  itemName : string;
  completeFtn : () => void;
}

export const ItemDetailModal = ({isImageModalOpen, closeFnt, imageURL, itemType, itemName, completeFtn}: ItemDetailProps) => {

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
    buttonInnerText=""
    noButton={true}
    ViewStyle='iteminfo'
    btnVariant='default'>
    <View style={styles.container}>
      <FastImage style={getStyle()} source={{ uri: imageURL }} resizeMode={getResizeMode()}/>
      <Text numberOfLines={1} style={styles.container_text}>{itemName}</Text>
      <View style={styles.btnContainer}>
        <AppButton onPress={completeFtn} variant="itemSelectBtn">
          {itemType === 'TREE' ? '나무 선택하기' : '섬 선택하기'}
        </AppButton>
        <AppButton children="돌아가기" onPress={closeFnt} variant="itemselectIslandBtn" />
      </View>
    </View>
  </ModalComponent>
};