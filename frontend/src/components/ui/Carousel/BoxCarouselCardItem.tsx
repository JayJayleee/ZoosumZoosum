import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import AppText from '../Text';
import {ShiningEffect} from './ShiningEffect';
import Gift from './GiftEffect';

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
    require('@/assets/img_icon/gift_img.png'),
  );
  const [showShiningEffect, setShowShiningEffect] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (index === activeIndex) {
      setShowShiningEffect(false);
      timer = setTimeout(() => {
        setShowShiningEffect(true);
        setImageSrc({uri: item.fileUrl});
        setHeaderText(`${item.itemName}을 얻었어요!`);
      }, 3060); // 3.7초 뒤에 실행
    } else {
      setHeaderText('상자에 뭐가 들어있을까요?');
      setImageSrc(require('@/assets/img_icon/gift_img.png'));
      setShowShiningEffect(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);

  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>{headerText}</AppText>
      <Gift key={activeIndex} />

      {/* {showShiningEffect && <ShiningEffect />} */}

      {showShiningEffect && (
        <Image style={styles.boxImage} source={imageSrc}></Image>
      )}
    </View>
  );
}