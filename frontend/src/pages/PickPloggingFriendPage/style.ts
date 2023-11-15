import { StyleSheet, Button } from 'react-native';
import { windowHeight, windowWidth } from "@/constants/styles";

const styles = StyleSheet.create({
  backgroungcolor : {
    backgroundColor: 'black',
    position: 'absolute',
    width : windowWidth,
    height : windowHeight,
    opacity : 0.2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  head : {
    top: windowHeight * 0.02,
    marginTop : windowWidth*0.2,
    alignItems: 'center',
    paddingBottom : windowWidth*0.05,
    // marginBottom : windowWidth*0.1,
  },
  head_title : {
    fontSize : 30,
    color : "white",
    fontFamily : 'NPSfont_extrabold',
  },
  body1 : {
    width : windowWidth,
    height : windowHeight*0.4,
    marginTop : windowHeight*0.05,
    justifyContent : 'center',
    alignItems : 'center',
    // marginBottom : windowHeight*0.02
  },
  FriendDetail_Image : {
    width : '90%',
    height : '80%',
    top: windowHeight * 0.03
  },
  animalName : {
    color : 'white',
    fontSize : 40,
    fontFamily : 'NPSfont_extrabold',
    marginBottom : 20,
    top: windowHeight * (-0.01)
  },
  viewAnimalDescription : {
    width : windowWidth,
  },
  animalDescription : {
    color : 'white',
    fontSize : 15,
    textAlign : 'center',
    fontFamily : 'NPSfont_bold',
    flexWrap : 'wrap',
    lineHeight : 35,
  },
  body2 : {
    width : windowWidth,
    height : windowHeight,
    marginTop : windowHeight*0.09,
    justifyContent : 'flex-start',
    alignItems : 'center',
  },
  bodyContainer1 : {
    width : windowWidth*0.75,
    flexDirection : 'row',
    justifyContent : 'space-evenly'
  },
  active : {
    width: windowWidth * 0.45,
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : 30,
  },
  Together : {
    backgroundColor : '#FFEBA6',
    width : windowWidth*0.35,
    height : windowHeight*0.05,
    marginTop : 10,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 8,
    elevation : 3,
  },
  title : {
    color : 'white',
    fontSize : 20,
  },
  title2 : {
    color : 'black',
    fontSize : 18,
    fontFamily : 'NPSfont_extrabold',
  },
  switchButtons : {
    width : windowWidth,
    height : windowHeight*0.13,
    position : 'absolute',
    flexDirection : 'row',
    justifyContent : 'space-between',
    bottom : "5%",
    // backgroundColor : 'red'
  },
  arrow : {
    top: windowHeight * 0.01,
    width : windowHeight * 0.1,
    height : windowHeight * 0.1,
    
  }
});

export default styles;
