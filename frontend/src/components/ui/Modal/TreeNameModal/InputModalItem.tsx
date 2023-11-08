import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AppText from '../../Text';
import {TreeCarouselCardItemProps} from '@/types/plogging';
import {treeApi} from '@/apis/tree';

export function InputModalItem({
  item,
  index,
  onUserData,
}: TreeCarouselCardItemProps) {
  const [userName, setUserName] = useState('');
  const [treeName, setTreeName] = useState('');
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userBirth, setUserBirth] = useState<string | null>(null);

  const treeNameInputRef = useRef<TextInput>(null);
  const userBirthInputRef = useRef<TextInput>(null);
  const userPhoneInputRef = useRef<TextInput>(null);
  // useEffect(() => {
  //   console.log(userName, treeName, userPhone, userBirth);
  // }, [userName, treeName, userPhone, userBirth]);
  useEffect(() => {
    if (userName && treeName && userPhone && userBirth && onUserData) {
      onUserData({
        userName,
        treeName,
        userPhone,
        userBirth,
      });
    }
    console.log('입력된 데이터', onUserData);
  }, [userName, treeName, userBirth, userPhone, onUserData]);

  useEffect(() => {
    // 특정 조건에 따라 자동으로 포커스를 할당하려면 이 부분을 수정하세요.
    // 예를 들어, userBirth가 null이면 포커스를 주는 등의 조건을 추가할 수 있습니다.
    console.log('유저 생일');
    if (userBirthInputRef.current) {
      userBirthInputRef.current.focus();
    }
  }, []);

  // 숫자만 입력받는 함수
  // const handleNumberInput = (
  //   input: string,
  //   setInput: React.Dispatch<React.SetStateAction<number | null>>,
  // ) => {
  //   if (input === '') {
  //     setInput(null);
  //   } else {
  //     const numbers = input.replace(/[^0-9]/g, '');
  //     setInput(parseInt(numbers, 10));
  //   }
  // };

  const handleInputChange = (
    input: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (input === '') {
      setter(null);
    } else {
      setter(input);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            flex: 1,
          }}>
          {/* {item?.image && (
        <Image
          source={item.image}
          style={{borderRadius: 10, height: '40%', aspectRatio: 1}}
        />
      )} */}
          <AppText
            style={{
              fontFamily: 'NPSfont_extrabold',
              fontSize: 30,
              padding: 10,
              textAlign: 'center',
              lineHeight: 40,
            }}>
            🌱 나무에게 🌱{'\n'}이름을 지어주세요
          </AppText>

          <View style={{width: '70%', flex: 1}}>
            <AppText style={{marginLeft: 10, marginBottom: 5}}>
              나의 이름
            </AppText>
            <TextInput
              style={{
                width: '100%',
                height: '60%',
                borderRadius: 10,
                backgroundColor: '#E3E5E5',
                textAlign: 'center',
                fontFamily: 'NPSfont_regular',
                color: 'black',
              }}
              placeholder={'이름을 입력해주세요'}
              value={userName}
              onChangeText={setUserName}
              returnKeyType="next"
              onSubmitEditing={() => treeNameInputRef.current?.focus()}
            />
          </View>

          <View style={{width: '70%', flex: 1}}>
            <AppText style={{marginLeft: 10, marginBottom: 5}}>
              나무의 이름
            </AppText>
            <TextInput
              style={{
                width: '100%',
                height: '60%',
                borderRadius: 10,
                backgroundColor: '#E3E5E5',
                textAlign: 'center',
                fontFamily: 'NPSfont_regular',
                color: 'black',
              }}
              ref={treeNameInputRef}
              placeholder={'나무에게 이름을 지어주세요'}
              placeholderTextColor="#777"
              value={treeName}
              onChangeText={setTreeName}
              returnKeyType="next"
              onSubmitEditing={() => userBirthInputRef.current?.focus()}
            />
          </View>

          <View style={{width: '70%', flex: 1}}>
            <AppText style={{marginLeft: 10, marginBottom: 5}}>
              생년월일
            </AppText>
            <TextInput
              style={{
                width: '100%',
                height: '60%',
                borderRadius: 10,
                backgroundColor: '#E3E5E5',
                textAlign: 'center',
                fontFamily: 'NPSfont_regular',
                color: 'black',
              }}
              ref={userBirthInputRef}
              placeholder={'숫자만 입력해주세요'}
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              value={userBirth !== null ? userBirth.toString() : ''}
              onChangeText={text => handleInputChange(text, setUserBirth)}
              returnKeyType="next"
              onSubmitEditing={() => userPhoneInputRef.current?.focus()}
            />
          </View>

          <View style={{width: '70%', flex: 1}}>
            <AppText style={{marginLeft: 10, marginBottom: 5}}>
              전화번호
            </AppText>
            <TextInput
              style={{
                width: '100%',
                height: '60%',
                borderRadius: 10,
                backgroundColor: '#E3E5E5',
                textAlign: 'center',
                fontFamily: 'NPSfont_regular',
                color: 'black',
              }}
              ref={userPhoneInputRef}
              placeholder={'숫자만 입력해주세요'}
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              onChangeText={text => handleInputChange(text, setUserPhone)}
              value={userPhone !== null ? userPhone.toString() : ''}
              returnKeyType="done"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
