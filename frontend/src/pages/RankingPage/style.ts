import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent : 'center'
  },
  rankingsheet : {
    width : "90%",
    height : "90%"
  },
  rankingpage : {
    width : "100%",
    height : "100%",
    backgroundColor: 'red',
    justifyContent : 'center',
    alignItems : 'center',
    paddingTop : '35%'
  },
  button_container :{
    flexDirection: 'row',
    alignItems: 'center',
    margin : '5%',
  },
  list_container : {
    width : '100%',
    height : '100%',
    justifyContent : 'flex-start',
    alignItems : 'center',
  },
  ranking_container : {
    width : '90%',
    height : '90%',
    backgroundColor : 'white',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 15,
    opacity : 0.8,
    paddingHorizontal : "5%",
    paddingVertical : "10%"
  },
  select_container : {
    width : '100%',
    height : '10%',
    backgroundColor : 'red',
  },
  title_container : {
    width : '100%',
    height : '10%',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
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
