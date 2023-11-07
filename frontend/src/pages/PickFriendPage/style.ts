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
    height : '100%',
    width : '100%',
    alignItems : 'center',
    marginBottom : 30,
  },
  having_cardlist : {
    width : '85%',
    height : '65%',
    marginTop : 10,
  },
  hiddenCard: {
    width: 115,
    height: 130,
  },
  pickAnimalCardList : {
    justifyContent : 'center',
    alignItems : 'center',
    width : "100%",
    height : "100%"
  }
});

export default styles;
