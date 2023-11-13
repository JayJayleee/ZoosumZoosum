import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import AppText from '../Text';
import {Gift} from '../animation/LottieEffect';
import {ItemCarouselCardItemProps} from '@/types/plogging';

export function BoxCarouselCardItem({
  item,
  index,
  activeIndex,
  itemType,
}: ItemCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('상자에 뭐가 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>(
    require('@/assets/img_icon/gift_img.png'),
  );
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (index === activeIndex) {
      setShowItem(false);
      timer = setTimeout(() => {
        setShowItem(true);
        setImageSrc({uri: item.fileUrl});
        if (itemType === 'TREE') {
          setHeaderText(`${item.itemName}를 얻었어요!`);
        } else {
          setHeaderText(`${item.itemName}을 얻었어요!`);
        }
      }, 3060);
    } else {
      setHeaderText('상자에 뭐가 들어있을까요?');
      setImageSrc(require('@/assets/img_icon/gift_img.png'));
      setShowItem(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);

  const imageStyle = itemType === 'TREE' ? styles.treeImage : styles.boxImage;

  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>{headerText}</AppText>
      <Gift key={activeIndex} />

      {showItem && <Image style={imageStyle} source={imageSrc}></Image>}
    </View>
  );
}
