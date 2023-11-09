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
import {useQueryClient, useMutation} from '@tanstack/react-query';
// import {ShiningEffect} from './ShiningEffect';
import {FirstEggName} from '@/apis/tutorial';

export function AnimalCarouselCardItem({
  item,
  index,
  activeIndex,
  onNamingComplete,
  gotomain,
}: AnimalCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('어떤 정령이 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>('');
  const [showInput, setShowInput] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [animalId, setAnimalId] = useState<number | undefined>(0);
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [showEgg, setShowEgg] = useState(true);
  const [savedName, setSavedName] = useState<string | undefined>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // console.log(animalId);
  // const queryClient = useQueryClient();
  const createMutation = useMutation(FirstEggName, {
    onSuccess: data => {
      // 이름 저장 성공 시 수행할 작업
      // console.log('이름 바꾸기 성공', data);
      const nameToSave =
        animalName?.trim() !== '' ? animalName : item?.animalName;
      setHeaderText(`${nameToSave}가 태어났어요!`);
      setIsNameSaved(true);
      setSavedName(nameToSave ? nameToSave : item?.animalName);
      if (onNamingComplete && isNameSaved && nameToSave) {
        onNamingComplete(nameToSave); // 부모 컴포넌트의 상태를 업데이트하는 콜백 호출
      }
    },
    onError: error => {
      // 이름 저장 실패 시 수행할 작업
      console.log('이름 바꾸기 실패', error);
    },
  });

  const handleSaveName = () => {
    if (item && animalId !== undefined) {
      const nameToSave =
        animalName?.trim() !== '' ? animalName : item?.animalName;
      createMutation.mutate({
        animalId: animalId,
        userAnimalName: nameToSave,
      });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (index === activeIndex) {
      setShowEgg(true);

      timer = setTimeout(() => {
        setShowEgg(false);
        setHeaderText(`${item?.animalName}가 태어났어요!`);
        setImageSrc({uri: item?.fileUrl});
        setAnimalId(item?.animalId);
        setShowInput(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowEgg(true);
      // 인덱스가 activeIndex와 다르면 로티 애니메이션을 다시 보여줌, 없애지 말 것...
      setHeaderText('어떤 정령이 들어있을까요?');
      setImageSrc(null);
      setShowInput(false);
    }
  }, [activeIndex, item]);

  return (
    <KeyboardAvoidingView
      style={[styles.giftcarouselcontainer, {flex: 1}]}
      key={index}>
      <ScrollView
        contentContainerStyle={[
          styles.centerContent,
          {flexGrow: 1, paddingBottom: isKeyboardVisible ? 100 : 0},
        ]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.centeredView}>
          {!isKeyboardVisible && (
            <AppText style={styles.header}>{headerText}</AppText>
          )}
          {!isKeyboardVisible && showEgg && <Egg key={activeIndex} />}
          {!isKeyboardVisible && imageSrc && (
            <Image source={imageSrc} style={styles.animalimage} />
          )}
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
          {onNamingComplete && isNameSaved && gotomain ? (
            <AppButton
              children="섬으로 가기"
              variant="animalName"
              onPress={() => {
                gotomain();
              }}
            />
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
