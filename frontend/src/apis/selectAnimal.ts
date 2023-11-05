import {api, Header} from './index';


type ApiResponse = {
  data: Animal[];
};

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


export const fetchMySelectAnimalInfo = async () => {
  return await api.get<ApiResponse>('/animal/plog', await Header());
};