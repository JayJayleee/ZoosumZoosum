import {api, Header} from './index';

// type AnimalList = {
//   animalList: Array<Animal>;
// };

type Animal = {
  animalId: number;
  animalName: string;
  fileUrl: string;
  selected: boolean;
};
type AnimalList = {
  data : Animal[];
}

export const fetchMyAnimalListInfo = async () => {
  return await api.get<AnimalList>('/animal/3141238159', await Header());
};
