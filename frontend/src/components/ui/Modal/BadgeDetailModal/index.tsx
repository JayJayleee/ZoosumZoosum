import ModalComponent from "..";
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import { badgeInfo } from "@/types/profile";
import { windowHeight, windowWidth } from "@/constants/styles";
import AppText from "../../Text";

type BadgeDetailProps = {
  isModalOpen: boolean;
  closeFnt: () => void;
  badgeInfo: badgeInfo | undefined;
}

export const BadgeDetailModal = ({isModalOpen, closeFnt, badgeInfo}: BadgeDetailProps) => {
  return(
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}>
      <Pressable style={styles.pressure} onPress={closeFnt}/>
      <View style={badgeInfo?.have? styles.modalBox : styles.modalReverseBox}>
        <TouchableOpacity style={styles.badgeClose} onPress={closeFnt}>
          <FastImage source={require("@/assets/img_icon/x_mark.png")} style={styles.xMark}/>
        </TouchableOpacity>
        <View style={styles.badgeShowBox}>
          {badgeInfo?.have? <FastImage style={styles.BadgeImage} source={{ uri: badgeInfo?.fileUrl }} /> : <FastImage style={styles.BadgeReverseImage} source={require("@/assets/img_icon/lock_img.png")} />}
        </View>
        <AppText style={badgeInfo?.have ? styles.boldText:styles.boldReverseText}>
          {badgeInfo?.badgeName}
        </AppText>
        <AppText style={badgeInfo?.have ? styles.contentText:styles.contentReverseText}>
          {badgeInfo?.badgeCondition}
        </AppText>
        {badgeInfo?.have? 
        <AppText style={styles.footerText}>획득일 : {badgeInfo?.updateTime.split("T")[0].split("-")[0]}년 {badgeInfo?.updateTime.split("T")[0].split("-")[1]}월 {badgeInfo?.updateTime.split("T")[0].split("-")[2]}일</AppText> : 
        <AppText style={styles.footerReverseText}>뱃지를 아직 얻지 못했어요</AppText>}
      </View>
    </Modal>
  )
};