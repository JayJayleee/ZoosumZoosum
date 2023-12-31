import { windowHeight, windowWidth } from "@/constants/styles";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container : {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyUpBox: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowHeight*0.2,
  },
  logo : {
    width: windowWidth * 0.8,
    height: windowHeight * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox : {
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    width: "80%",
    height: "40%",
    borderRadius: 20,
    marginBottom: '5%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nicknameInfo: {
    fontSize: 15,
    position: 'absolute',
    top: windowHeight * 0.18
  },
  inputTitleText: {
    fontSize: 30,
    fontFamily: 'NPSfont_bold',
    color: 'black',
    marginBottom: '5%'
  },
  inputNickname : {
    marginTop: '20%',
    borderColor:"#6B4EFF",
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: 'NPSfont_bold',
  },
  errorModal: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'NPSfont_bold',
    color: 'black'
  },
})