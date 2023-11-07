import React from 'react';
import {View, Image, FlatList, Button} from 'react-native';
import ModalComponent from '@/components/ui/Modal';
import AppText from '@/components/ui/Text';
import {TrashList, TrashDataReturnList} from '@/types/plogging';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/path';

interface TrashModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: TrashDataReturnList[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const TrashModal = ({
  isVisible,
  onClose,
  data,
  navigation,
}: TrashModalProps) => {
  const Item = ({title, img, description}: TrashDataReturnList) => (
    <View style={{width: 120, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{height: 100, aspectRatio: 1, resizeMode: 'contain'}}
        source={img}
      />
      <AppText style={{color: 'black', fontSize: 14, marginTop: 5}}>
        {title}
      </AppText>
      <AppText style={{color: 'black', fontSize: 14, marginTop: 5}}>
        {description}
      </AppText>
    </View>
  );

  return (
    <ModalComponent
      isVisible={isVisible}
      onClose={onClose}
      onRequestClose={onClose}
      buttonInnerText={'닫기'}>
      <AppText
        style={{
          color: 'black',
          fontFamily: 'NPSfont_bold',
          fontSize: 25,
          marginBottom: 15,
        }}>
        방금 주운 쓰레기
      </AppText>
      <FlatList
        data={data}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({item}) => (
          <Item
            title={item.title}
            img={item.img}
            description={item.description}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
      />
      <Button
        title="다시 찍을래!"
        onPress={() => navigation.navigate('Camera')}
      />
    </ModalComponent>
  );
};

export default TrashModal;
