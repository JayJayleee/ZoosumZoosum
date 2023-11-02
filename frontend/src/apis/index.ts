import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://zoosum.co.kr/api';

// storage에 저장된 token 가져오기(get)
export const getStorage = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

// storage에 받은 token 저장하기(set)
export const setStorage = async (key: string, token: string) => {
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
  });
};

// api header
export const Header = async () => ({
  headers: {
    Authorization: `Bearer ${await getStorage('Accesstoken')}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

// request
const request = async (path: string, init?: RequestInit, json = true) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(json && {'Content-Type': 'application/json'}),
      ...init?.headers,
    },
  });
  return response;
};

// api
export const api = {
  get: <T = unknown>(path: string, init?: RequestInit) =>
    request(path, init).then<T>(response => response.json()),

  put: <T = unknown>(path: string, payload?: T, init?: RequestInit) =>
    request(path, {
      headers: init?.headers,
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  post: <T = unknown>(path: string, payload?: T, init?: RequestInit) =>
    request(path, {
      headers: init?.headers,
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  delete: <T = unknown>(path: string, payload?: T, init?: RequestInit) =>
    request(path, {
      headers: init?.headers,
      method: 'DELETE',
      body: JSON.stringify(payload),
    }),
};
