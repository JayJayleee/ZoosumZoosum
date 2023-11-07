import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container : {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo : {
    width: "80%",
    height: "30%",
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
  },
  inputTitleText: {
    fontSize: 25,
    fontFamily: 'NPSfont_bold',
    color: 'black'
  },
  inputNickname : {
    borderColor:"#6B4EFF",
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
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