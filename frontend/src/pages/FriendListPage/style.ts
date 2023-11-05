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
  title_body : {
    color : 'white',
    fontSize : 20,
  },
  head : {
    height : '10%',
    marginTop : '10%'
  },
  body1 : {
    height : '20%',
    width : '100%',
    alignItems : 'center',
    marginBottom : 10,
  },
  body2 : {
    height : '50%',
    width : '100%',
    alignItems : 'center',
    marginBottom : 30,
  },
  select_cardlist : {
    width : '100%',
    height : '80%',
    marginTop : 10,
    backgroundColor : '#646567',
    borderRadius : 10,
    justifyContent : 'center'
  },
  having_cardlist : {
    width : '85%',
    height : '100%',
    marginTop : 10,
  },
  hiddenCard: {
    width: 115,
    height: 130,
  },
});

export default styles;
