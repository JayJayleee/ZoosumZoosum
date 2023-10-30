import {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

interface ItemCarouselCardItemProps {
  item: {
    fileUrl: string;
    itemName: string;
  };
  index: number;
  activeIndex?: number;
}

export function BoxCarouselCardItem({
  item,
  index,
  activeIndex,
}: ItemCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('상자에 뭐가 들어있을까요?');
  const [imageSrc, setImageSrc] = useState('https://i.imgur.com/VH8N3fp.png');
  const [isInitialRender, setIsInitialRender] = useState(index === activeIndex);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (index === activeIndex) {
      console.log(activeIndex, '액티브함');
      const timer = setTimeout(() => {
        setHeaderText(`${item.itemName}을 얻었어요!`);
        setImageSrc(item.fileUrl);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setHeaderText('상자에 뭐가 들어있을까요?');
      setImageSrc('https://i.imgur.com/VH8N3fp.png');
    }
  }, [activeIndex]);

  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{headerText}</Text>
      <Image source={{uri: imageSrc}} style={styles.image} />
    </View>
  );
}
