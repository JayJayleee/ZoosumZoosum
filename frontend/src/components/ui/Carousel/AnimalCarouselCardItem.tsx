import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import AppText from '../Text';
import AppButton from '../Button';
import styles from './styles';
import {Egg} from '../animation/LottieEffect';
import {AnimalCarouselCardItemProps} from '@/types/plogging';
// import {ShiningEffect} from './ShiningEffect';

export function AnimalCarouselCardItem({
  item,
  index,
  activeIndex,
}: AnimalCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('어떤 정령이 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>(null); // 초기 이미지 소스를 null로 설정
  const [showInput, setShowInput] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [showEgg, setShowEgg] = useState(true); // 로티 애니메이션을 보여줄 상태 변수
  const [savedName, setSavedName] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleSaveName = () => {
    if (item) {
      const nameToSave =
        animalName.trim() !== '' ? animalName : item?.animalName;
      setSavedName(nameToSave);
      setHeaderText(`${nameToSave}가 태어났어요!`);
      setIsNameSaved(true);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 이벤트 리스너 추가
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // 키보드가 나타날 때 상태를 true로 설정
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // 키보드가 사라질 때 상태를 false로 설정
      },
    );

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (index === activeIndex) {
      console.log(activeIndex, '액티브함');

      setShowEgg(true); // 로티 애니메이션을 보여줌

      timer = setTimeout(() => {
        setShowEgg(false); // 로티 애니메이션을 숨김
        setHeaderText(`${item?.animalName}가 태어났어요!`);
        setImageSrc({uri: item?.fileUrl});
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
    <KeyboardAvoidingView
      style={[styles.giftcarouselcontainer, {flex: 1}]}
      key={index}>
      <ScrollView
        contentContainerStyle={[
          styles.centerContent,
          {flexGrow: 1, paddingBottom: isKeyboardVisible ? 100 : 0}, // 조건부 스타일 적용
        ]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.centeredView}>
          {!isKeyboardVisible && (
            <AppText style={styles.header}>{headerText}</AppText>
          )}
          {showEgg && <Egg key={activeIndex} />}
          {imageSrc && <Image source={imageSrc} style={styles.animalimage} />}
          {/* {imageSrc && <ShiningEffect />} */}
          {showInput && (
            <View style={styles.inputcontainer}>
              {isNameSaved ? (
                <AppText style={styles.animalName}>{savedName}</AppText>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    onChangeText={setAnimalName}
                    placeholder={item?.animalName}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
