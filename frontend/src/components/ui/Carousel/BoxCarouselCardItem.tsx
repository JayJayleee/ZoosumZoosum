import {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import AppText from '../Text';
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
  const [imageSrc, setImageSrc] = useState<any>(
    require('@/assets/animation/box_shake.gif'),
  );
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
        setImageSrc({uri: item.fileUrl});
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setHeaderText('상자에 뭐가 들어있을까요?');
      setImageSrc(require('@/assets/animation/box_shake.gif'));
    }
  }, [activeIndex]);

  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>{headerText}</AppText>
      <Image source={imageSrc} style={styles.image} />
    </View>
  );
}
