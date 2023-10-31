import { StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  backgroungcolor : {
    backgroundColor: 'black',
    position: 'absolute',
    width : '100%',
    height : '100%',
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
    height : '20%',
    marginTop : '10%',
    justifyContent : 'center',
    alignItems : 'center',
  },
  body1 : {
    height : '80%',
    width : '100%',
    alignItems : 'center',
    marginBottom : 30,
  },
  having_cardlist : {
    width : '85%',
    height : '65%',
    marginTop : 10,
  },
  button : {
    width : 200,
    height : 50,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#34D399',
    borderRadius : 15,
    position : 'absolute',
    top : '85%',
  },
  button_text : {
    color : 'white',
    fontSize : 18,
    fontWeight : "600"
  },
  hiddenCard: {
    width: 115,
    height: 130,
  },
});

export default styles;
