import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';
import { ItemDetailModal } from '@/components/ui/Modal/ItemDetailModal';

interface ItemCardProps {
  itemId : number,
  itemName : string,
  fileUrl : string,
  selected : boolean,
  itemType : string,
}

export default function ItemCard({itemName, fileUrl, selected, itemType}: ItemCardProps) {
  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");
  const [itemTypes, setItemTypes] = useState<string>("");

  const getImageStyle = () => {
    return itemType === 'TREE' ? styles.image : styles.image2;
  };
  const gotodetail = (fileUrl :string,itemType : string, ) => {
    setImageURL(fileUrl)
    setItemTypes(itemType)
    setImageModalOpen(true)
  }
  return (
    <>
    {isImageModalOpen && <ItemDetailModal isImageModalOpen={isImageModalOpen} closeFnt={() => setImageModalOpen(false)} imageURL={imageURL} itemType={itemTypes} />}
    <View style={styles.card}>
      <TouchableOpacity style={styles.card2} onPress={() => gotodetail(fileUrl, itemType)}>
        {selected == true &&
          <FastImage
          source={require('@/assets/tagging.png')}
          style={styles.taggingimage}
          />
          }
        <View style={styles.circle}>
          <Image style={getImageStyle()} source={{uri : fileUrl }} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{itemName}</Text>
      </TouchableOpacity>
      

    </View>
    </>
  );
};


import { windowHeight, windowWidth } from "@/constants/styles";
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    // width : windowWidth,
    height : windowHeight*0.18,
    margin : 5,
  },
  taggingimage : {
    position : 'absolute',
    width : windowWidth*0.1,
    height : windowHeight*0.1,
    zIndex : 99,
    top : "-10%",
    right : "-5%"
  },
  card2: {
    justifyContent : 'center',
    alignItems : 'center',
  },
  title: {
    fontSize: 18,
    fontFamily : 'NPSfont_bold'
  },
  image: {
    marginTop : 20,
    height : '200%',
    width : '200%',
    resizeMode : 'contain'
  },
  image2: {
    height : '110%',
    width : '110%',
    resizeMode : 'contain'
  },
  circle: {
    width : windowWidth*0.26,
    height : windowWidth*0.2,
    flex :1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#FFD7D7',
    borderRadius : 100,
  }
});
