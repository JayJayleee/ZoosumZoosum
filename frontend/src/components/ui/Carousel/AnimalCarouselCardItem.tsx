import React, {useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../Text';
import AppButton from '../Button';
import styles from './styles';
import {Egg} from '../animation/LottieEffect';
import {AnimalCarouselCardItemProps} from '@/apis/plogging';
// import {ShiningEffect} from './ShiningEffect';

export function AnimalCarouselCardItem({
  item,
  index,
  activeIndex,
}: AnimalCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('어떤 정령이 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>(null); // 초기 이미지 소스를 null로 설정
  const [showInput, setShowInput] = useState(false);
  const [animalName, setAnimalName] = useState(item.animalName);
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [showEgg, setShowEgg] = useState(true); // 로티 애니메이션을 보여줄 상태 변수

  const handleSaveName = () => {
    console.log(`이름이 저장되었습니다: ${animalName}`);
    setIsNameSaved(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (index === activeIndex) {
      console.log(activeIndex, '액티브함');

      setShowEgg(true); // 로티 애니메이션을 보여줌

      timer = setTimeout(() => {
        setShowEgg(false); // 로티 애니메이션을 숨김
        setHeaderText(`${item.animalName}가 태어났어요!`);
        setImageSrc({uri: item.fileUrl});
        setShowInput(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowEgg(true); // 인덱스가 activeIndex와 다르면 로티 애니메이션을 다시 보여줌
      setHeaderText('어떤 정령이 들어있을까요?');
      setImageSrc(null);
      setShowInput(false);
    }
  }, [activeIndex]);

  return (
    <View style={styles.giftcarouselcontainer} key={index}>
      <AppText style={styles.header}>{headerText}</AppText>
      {showEgg && <Egg key={activeIndex} />}
      {imageSrc && <Image source={imageSrc} style={styles.animalimage} />}
      {/* {imageSrc && <ShiningEffect />} */}
      {showInput && (
        <View style={styles.inputcontainer}>
          {isNameSaved ? (
            <AppText style={styles.animalName}>{animalName}</AppText>
          ) : (
            <>
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
            </>
          )}
        </View>
      )}
    </View>
  );
}
