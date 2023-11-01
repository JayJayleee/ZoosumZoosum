import React, {useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../Text';
import AppButton from '../Button';
import styles from './styles';
interface AnimalCarouselCardItemProps {
  item: {
    fileUrl: string;
    animalName: string;
    description: string;
    animalId: string;
  };
  index: number;
  activeIndex?: number;
}

// 동물에 대한 캐롯셀 아이템

export function AnimalCarouselCardItem({
  item,
  index,
  activeIndex,
}: AnimalCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('어떤 정령이 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>(
    require('@/assets/animation/eggshake.gif'),
  );
  const [showInput, setShowInput] = useState(false);
  const [animalName, setAnimalName] = useState(''); // 동물 이름을 저장하는 상태

  const handleSaveName = () => {
    console.log(`이름이 저장되었습니다: ${animalName}`);
    // TODO: 서버에 이름 저장
  };

  useEffect(() => {
    if (index === activeIndex) {
      console.log(activeIndex, '액티브함');
      const timer = setTimeout(() => {
        setHeaderText(`${item.animalName}가 태어났어요!`);
        setImageSrc({uri: item.fileUrl});
        setShowInput(true); // setTimeout 후에 input과 버튼을 보이게 함
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setHeaderText('어떤 정령이 들어있을까요?');
      setImageSrc(require('@/assets/animation/eggshake.gif'));
      setShowInput(false); // 이 부분은 다른 카드를 보게 되면 input과 버튼을 숨김
    }
  }, [activeIndex]);
  return (
    <View style={styles.container} key={index}>
      <AppText style={styles.header}>{headerText}</AppText>
      <Image source={imageSrc} style={styles.image} />
      {showInput && (
        <View style={{alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            value={animalName}
            onChangeText={setAnimalName}
            placeholder={item.animalName}
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />
          <AppButton
            variant="animalName"
            children="너의 이름은..."
            onPress={handleSaveName}
          />
        </View>
      )}
    </View>
  );
}
