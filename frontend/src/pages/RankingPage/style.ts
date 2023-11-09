import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent : 'flex-end'
  },
  rankingsheet : {
    width : "100%",
    height : "98%",
    justifyContent : 'center',
    alignItems : 'center',
  },
  rankingpage : {
    width : "100%",
    height : "100%",
    justifyContent : 'center',
    alignItems : 'center',
    paddingTop : '45%'
  },
  button_container :{
    flexDirection: 'row',
    alignItems: 'center',
  },
  list_container : {
    width : '90%',
    height : '100%',
    justifyContent : 'flex-start',
    alignItems : 'center',
  },
  title_head : {
    fontSize : 30,
    fontFamily : 'NPSfont_extrabold',
  },
  ranking_container : {
    width : '80%',
    height : '85%',
    justifyContent : 'flex-start',
    alignItems : 'center',
    borderRadius : 15,
    opacity : 0.8,
    paddingHorizontal : "5%",
  },
  select_container : {
    width : '100%',
    height : '8%',
    justifyContent : 'center',
    alignItems : 'center',
    zIndex : 3
  },
  title_container : {
    width : '100%',
    height : '10%',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderBottomWidth : 1,
    borderStyle: 'solid',
  },
  body_container : {
    width : '100%',
    height : '80%',
  },
  title_grid1 : {
    width : '15%',
    textAlign : 'center',
    fontFamily : 'NPSfont_extrabold',
    fontSize : 20,
  },
  title_grid2 : {
    width : '40%',
    textAlign : 'center',
    fontSize : 20,
    fontFamily : 'NPSfont_extrabold',
  },
  title_grid3 : {
    width : '15%',
    textAlign : 'center',
    fontSize : 20,
    fontFamily : 'NPSfont_extrabold',
  },
  title_grid4 : {
    width : '30%',
    textAlign : 'center',
    fontSize : 20,
    fontFamily : 'NPSfont_extrabold',
  },
})

export default styles;
