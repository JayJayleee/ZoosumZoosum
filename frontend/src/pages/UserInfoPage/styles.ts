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
  inputTitleText: {
    fontSize: 30,
    fontFamily: 'NPSfont_bold',
    color: 'black',
    marginBottom: '5%'
  },
  inputNickname : {
    borderColor:"#6B4EFF",
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    color: 'black'
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