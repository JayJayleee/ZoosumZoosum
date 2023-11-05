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