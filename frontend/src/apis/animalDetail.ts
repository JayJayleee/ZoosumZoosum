import {api, getStorage, Header} from './index';


type Animal = {
  animalId: number;
  userAnimalName: string;
  description :string;
  createTime : string;
  trashTogether : number;
  hour : number;
  minute : number;
  second : number;
  lengthTogether : number;
  fileUrl: string;
};

export const fetchMyAnimalDetailInfo = async (animalId: number ) => {
  // const nickname = await getStorage("Nickname")
  return await api.get<Animal>(`/animal/${animalId}`, await Header());
};
