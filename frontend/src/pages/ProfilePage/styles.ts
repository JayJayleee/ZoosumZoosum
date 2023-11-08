import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  staTitle: {
    position: 'relative',
    fontFamily: 'NPSfont_bold',
    fontSize: 40, 
    top: '10%', 
    color: 'white', 
    justifyContent:'center', 
    textAlign: 'center'
  },
  staNoteImg : {
    position: 'relative',
    top: '10%', 
    width: '100%', 
    height: '90%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  staNoteSection: {
    width: '80%', 
    height: '17%', 
    bottom: '5%', 
    flexDirection:'row',
    justifyContent:'space-evenly', 
    alignItems: 'center'
  },
  staNoteIconFoot : {
    width: '25%', 
    height: '62%',
  },
  staNoteIcon : {
    backgroundColor: '#FFE99C', 
    width: '25%', 
    height: '62%',
    borderRadius: 50
  },
  staNoteTitle: {
    fontFamily: 'NPSfont_bold',
    fontSize: 25, 
    color: 'black'
  },
  staNoteContent: {
    marginTop: '5%',
    textAlign: 'center',
    fontFamily: 'NPSfont_regular',
    fontSize: 18, 
    color: 'black'
  },
  staNoteLine: {
    borderBottomWidth: 0.5, 
    borderBottomColor: 'black', 
    width: '70%',
    bottom: '3%', 
  },
  tabSection: {
    position: 'relative',
    bottom: '15%',
    flexDirection: 'row', 
    backgroundColor: '#A5DCA0', 
    borderRadius: 15, 
    width: '95%', 
    height: '11%',
    paddingBottom: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  tabClickSection : {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabImage: {
    width: '80%', 
    height: '80%'
  },
  tabText: {
    fontSize: 15
  },
})