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
    marginBottom : 30,
  },
  body2 : {
    height : '50%',
    width : '100%',
    alignItems : 'center',
    marginBottom : 30,
  },
  select_cardlist : {
    width : '95%',
    height : '80%',
    marginTop : 10,
    backgroundColor : '#646567',
    borderRadius : 10
  },
  having_cardlist : {
    width : '85%',
    height : '100%',
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
  cardlist : {
  }
});

export default styles;
