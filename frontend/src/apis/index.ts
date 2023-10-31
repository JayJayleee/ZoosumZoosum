import AsyncStorage from "@react-native-async-storage/async-storage";

// storage에 저장된 token 가져오기(get)
export const getStorage = async (key: string) => {
  return await AsyncStorage.getItem(key)
}

// storage에 받은 token 저장하기(set)
export const setStorage = async (key: string ,token: string) => {
  return await AsyncStorage.setItem(key, token);
};

// storage에 저장된 token 삭제하기(delete)
export const removeStorage = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

// storage에 저장된 모든 값 초기화(clear)
export const clearStorage = async () => {
  return await AsyncStorage.clear();
};

// storage에 해당 키 값이 존재하는지 확인
export const containStorage = async (key: string) => {
  await AsyncStorage.getAllKeys().then(keys => {
    return keys.includes(key);
  })
}

// api header
export const Header = () => ({
  headers: {
    Authorization: `Bearer ${getStorage("Accesstoken")}`,
  },
});

// api
// export const api = {
  
// }