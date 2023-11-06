import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeImage = async (imagePath: any) => {
  try {
    await AsyncStorage.setItem('@photo_path', imagePath);
    console.log('savephote임:', await AsyncStorage.getItem('@photo_path'));
  } catch (e) {
    // 저장 에러 처리
    console.error('Failed to save the photo path.', e);
  }
};
