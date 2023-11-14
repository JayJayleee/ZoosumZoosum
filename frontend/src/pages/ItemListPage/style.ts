import { StyleSheet } from 'react-native';
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
  button_container :{
    flexDirection: 'row',
    alignItems: 'center',
    margin : 10,
  },
  list_container : {
    height : windowHeight*0.67,
    width : windowWidth,
  },
  title_head : {
    color : 'white',
    fontSize : 35,
    fontFamily : 'NPSfont_extrabold'
  },
  head : {
    height : windowHeight*0.1,
    marginTop : windowWidth*0.1
  },

  hiddenCard: {
    width: windowWidth*0.3,
    height: 130,
  },
  itemList : {
    flex: 1,
    alignItems: 'center',
    // width : '100%',
  },
  body2Item : {
    paddingTop : 20,
    width : '90%',
    height : '100%',
  },
  islandCard_image : {
    height : '100%',
    width : '100%',
    resizeMode: 'contain',
  },
  islandCard_title : {
    fontSize: 25,
  },
  treeCard_image : {
    height : '130%',
    width : '100%',
    // resizeMode: 'contain',
  },
  treeCard_title : {
    fontSize: 25,
  },
  button_container2 : {
    flexDirection : 'row'
  },
  isLoading : {
    flex: 1,
    alignItems: 'center',
    justifyContent : 'flex-start',
    // fontSize : 35,
    fontFamily : 'NPSfont_extrabold',
    marginTop : windowHeight * 0.06
  },
});

export default styles;
