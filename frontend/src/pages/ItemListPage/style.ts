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
  button_container :{
    flexDirection: 'row',
    alignItems: 'center',
    margin : 10,
  },
  list_container : {
    width : '100%',
    height : '100%'
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
    marginTop : '10%',
    marginBottom : '10%',
    alignItems: 'center',
  },
  body1 : {
    height : '50%',
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
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#34D399',
    borderRadius : 15,
    position : 'absolute',
    top : '85%',
  },
  button_select : {
    width : 150,
    height : 40,
    backgroundColor : '#F1B0B0',
    borderRadius : 10,
    padding : 10,
    marginBottom :10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  button_text : {
    color : 'white',
    fontSize : 15,
    fontWeight : "600",
  },
  hiddenCard: {
    width: 115,
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
    alignItems : 'center'
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
  islandCard : {
    backgroundColor: "white",
    borderRadius : 10,
    width : '90%',
    height : '80%',
    marginBottom : 10,
    justifyContent : 'flex-start',
    alignItems : 'center'
  },
  islandCard_image : {
    height : 200,
    width : 310,
  },
  islandCard_title : {
    fontSize: 18,
  },
});

export default styles;
