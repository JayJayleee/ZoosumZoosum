import { StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "@/constants/styles";


export const styles = StyleSheet.create({
  wave: {
    width: windowWidth * 0.9, 
    bottom:  windowHeight * 0.1,
    aspectRatio: 1
  },
})