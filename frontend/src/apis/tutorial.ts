import {api, Header} from './index';

type Egg = {
  animalId: number;
  animalName: string;
  fileUrl: string;
};

type EggName = {
  animalId: number;
  userAnimalName: string;
};
export const fetchFirstEgg = async () => {
  try {
    const response = await api.get<Egg>('/animal/draw', await Header());
    // console.log(response, '응답');
    return response;
  } catch (error) {
    // console.log(error, '에러ㄱ');
    throw error;
  }
};

export const EggName = async (data: EggName) => {
  try {
    const response = await api.post('/animal', data, await Header());
    console.log(response, '응답');
    return response;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답을 받은 경우, 응답의 오류 내용을 확인합니다.
      console.error('Error response body:', error.response.data);
      // 상태 코드와 상태 텍스트도 출력합니다.
      console.error('Error status:', error.response.status);
      console.error('Error status text:', error.response.statusText);
    } else if (error.request) {
      // 요청은 이루어졌으나 응답을 받지 못한 경우
      console.error('No response received:', error.request);
    } else {
      // 요청 설정 중에 오류가 발생한 경우
      console.error('Error setting up the request:', error.message);
    }
    // 스택 추적도 출력합니다.
    console.error('Error stack:', error.stack);
    throw error;
  }
};

export const FirstEggName = async (data: EggName) => {
  try {
    const response = await api.post('/animal/first', data, await Header());
    console.log(response, '최초 egg응답');
    return response;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답을 받은 경우, 응답의 오류 내용을 확인합니다.
      console.error('Error response body:', error.response.data);
      // 상태 코드와 상태 텍스트도 출력합니다.
      console.error('Error status:', error.response.status);
      console.error('Error status text:', error.response.statusText);
    } else if (error.request) {
      // 요청은 이루어졌으나 응답을 받지 못한 경우
      console.error('No response received:', error.request);
    } else {
      // 요청 설정 중에 오류가 발생한 경우
      console.error('Error setting up the request:', error.message);
    }
    // 스택 추적도 출력합니다.
    console.error('Error stack:', error.stack);
    throw error;
  }
};
