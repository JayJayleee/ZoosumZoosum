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

export function InputModalItem({
  item,
  index,
  onUserData,
  errorAlert,
}: TreeCarouselCardItemProps) {
  const [userName, setUserName] = useState('');
  const [treeName, setTreeName] = useState('');
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userBirth, setUserBirth] = useState<string | null>(null);

  const treeNameInputRef = useRef<TextInput>(null);
  const userBirthInputRef = useRef<TextInput>(null);
  const userPhoneInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (
      userName &&
      treeName &&
      userPhone !== null &&
      userBirth !== null &&
      onUserData
    ) {
      onUserData({
        userName,
        treeName,
        userPhone,
        userBirth,
      });
    }
  }, [userName, treeName, userBirth, userPhone, onUserData]);

  const handleBirthInputChange = (input: string) => {
    const numbers = input.replace(/[^0-9]/g, '');

    let formatted = '';
    for (let i = 0; i < numbers.length && i < 8; i++) {
      if (i === 4 || i === 6) {
        formatted += '-';
      }
      formatted += numbers[i];
    }

    setUserBirth(formatted);
  };

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
          <AppText
            style={{
              fontFamily: 'NPSfont_extrabold',
              fontSize: 30,
              padding: 10,
              textAlign: 'center',
              lineHeight: 40,
              color: 'black',
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
              placeholderTextColor="#777"
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
              placeholder={'8자리 생년월일을 입력해주세요'}
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              value={userBirth || ''}
              onChangeText={handleBirthInputChange}
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
