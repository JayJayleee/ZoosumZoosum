import {api, Header} from './index';

// type AnimalList = {
//   animalList: Array<Animal>;
// };

type ApiResponse = {
  data: Animal[];
};

type Animal = {
  animalId: number;
  animalName: string;
  fileUrl: string;
  selected: boolean;
};

export const fetchMyAnimalListInfo = async () => {
  return await api.get<ApiResponse>('/animal', await Header());
};
export const fetchSelectMyFriend = async (selectedIds : number[]) => {
  const data = selectedIds ; // 요청 본문에 itemId를 포함하는 객체를 생성

  try {
    const response = await api.put('/animal/island', data, await Header());
    return response;
  } catch (error) {
    throw error;
  }
};