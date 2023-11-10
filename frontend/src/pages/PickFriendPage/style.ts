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
  title_head : {
    color : 'white',
    fontSize : 35,
    fontFamily : 'NPSfont_extrabold'
  },
  head : {
    height : windowHeight*0.2,
    marginTop : windowHeight*0.01,
    justifyContent : 'center',
    alignItems : 'center',
  },
  body1 : {
    height : windowHeight,
    width : windowWidth,
    alignItems : 'center',
    marginBottom : 30,
  },
  having_cardlist : {
    width : windowWidth,
    height : windowHeight*0.65,
    // marginTop : 10,
  },
  hiddenCard: {
    width: windowWidth*0.34,
  },
  pickAnimalCardList : {
    width : "100%",
    height : "100%",
  }
});

export default styles;
