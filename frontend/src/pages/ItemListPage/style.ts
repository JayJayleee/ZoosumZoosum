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
    width : windowWidth,
    height : windowHeight
  },
  title_head : {
    color : 'white',
    fontSize : 35,
    fontFamily : 'NPSfont_extrabold'
  },
  head : {
    height : windowHeight*0.1,
    marginTop : windowHeight*0.03,
    marginBottom : '5%',
    alignItems: 'center',
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
  headItem : {
    width : '100%',
    height : '5%',
    justifyContent : 'center',
    alignItems : 'center',
  },
  headItemTitle : {
    color : 'white',
    fontSize : 20,
  },
  bodyItem: {
    backgroundColor : '#646567',
    borderRadius : 10,
    width : '100%',
    height : '40%',
    justifyContent : 'flex-start',
    alignItems : 'center',
    paddingTop : 20,
  },
  body2Item : {
    paddingTop : 20,
    width : '90%',
    height : '30%',
  },
  ItemCardSelect : {
    backgroundColor: "white",
    borderRadius : 10,
    width : '90%',
    height : '80%',
    marginBottom : 5,
    justifyContent : 'flex-start',
    alignItems : 'center'
  },
  ItemCardSelectImgage : {
    height: "80%",
    width : "80%"
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
});

export default styles;
