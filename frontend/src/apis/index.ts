import AsyncStorage from "@react-native-async-storage/async-storage";

// storage에 저장된 token 가져오기(get)
export const getStorage = async () => {
  const Result = await AsyncStorage.getItem("AccessToken");
  return Result;
}

// storage에 받은 token 저장하기(set)
export const setStorage = async (token:string) => {
  return await AsyncStorage.setItem("AccessToken", token);
}

// storage에 저장된 token 삭제하기(delete)
export const removeStorage = async () => {
  return await AsyncStorage.removeItem("AccessToken");
}

// api header
export const Header = () => ({
  headers: {
    Authorization: `Bearer ${getStorage()}`,
  },
});

// api
export const api = {
  
}