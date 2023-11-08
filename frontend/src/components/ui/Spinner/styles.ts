import { StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "@/constants/styles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8BCCCB', 
    width: windowWidth, 
    height: windowHeight, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 100
  },
  image: {
    position: 'relative',
    bottom: windowHeight * 0.01,
    width: windowWidth * 0.8, 
    height: windowHeight * 0.3,
  },
  text: {
    color: 'white', 
    fontSize: 25, 
    bottom: windowHeight * 0.01,
  }
})