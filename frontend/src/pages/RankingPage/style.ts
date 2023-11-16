import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from "@/constants/styles";

const styles = StyleSheet.create({
  isLoading : {
    flex: 1,
    alignItems: 'center',
    justifyContent : 'flex-start',
    // fontSize : 35,
    fontFamily : 'NPSfont_extrabold',
    marginTop : windowHeight * 0.06
  },
  container: {
    flex: 1,
    alignItems: 'center',
  
  },
  rankingsheet : {
    width : windowWidth,
    height : windowHeight,
    justifyContent : 'center',
    alignItems : 'center',

  },
  rankingpage : {
    width : windowWidth,
    height : windowHeight,
    justifyContent : 'center',
    alignItems : 'center',
    paddingTop : windowHeight*0.1
  },
  button_container :{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth : 3,
    borderRadius : 30,
    // height : "20%"
    backgroundColor : 'white'
  },
  list_container : {
    width : windowWidth*0.85,
    height : '80%',
    justifyContent : 'flex-start',
    alignItems : 'center',
    
  },
  title_head : {
    fontSize : 30,
    fontFamily : 'NPSfont_extrabold',
    height: windowHeight * 0.06
  },
  ranking_container : {
    width : '90%',
    height : '90%',
    justifyContent : 'flex-start',
    alignItems : 'center',
    borderRadius : 15,
    opacity : 0.8,
    paddingHorizontal : "5%",
  },
  select_container : {
    width : '100%',
    position : 'absolute',
    justifyContent : 'flex-start',
    alignItems : 'center',
    zIndex : 99
  },
  select_container2 : {
    width : '100%',
    height : '10%',
    justifyContent : 'flex-start',
    alignItems : 'center',
    // marginBottom : '10%'
  },
  title_container : {
    width : '100%',
    height : '5%',
    flexDirection : 'row',
    marginBottom : '2%',
    borderBottomWidth : 1,
    borderStyle: 'solid',
  },
  body_container : {
    width : '100%',
    height : '100%',
  },
  title_grid1 : {
    width : '10%',
    textAlign : 'center',
    fontFamily : 'NPSfont_extrabold',
    fontSize : 15,
  },
  title_grid2 : {
    width : '30%',
    textAlign : 'center',
    fontSize : 15,
    fontFamily : 'NPSfont_extrabold',
  },
  title_grid3 : {
    width : '10%',
    textAlign : 'center',
    fontSize : 15,
    fontFamily : 'NPSfont_extrabold',
  },
  title_grid4 : {
    width : '20%',
    textAlign : 'center',
    fontSize : 15,
    fontFamily : 'NPSfont_extrabold',
  },
  title_grid5 : {
    width : '30%',
    textAlign : 'center',
    fontSize : 15,
    fontFamily : 'NPSfont_extrabold',
  },
  error_box: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign : 'center',
  },
  error_text : {
    fontFamily : 'NPSfont_extrabold',
    fontSize : 20,
  }
})

export default styles;
