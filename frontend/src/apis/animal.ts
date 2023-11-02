import {api, Header} from './index'

type AnimalList = {
  animalList: Array<Animal>;
}

type Animal = {
  animalId : number,
  animalName : string,
  fileUrl : string,
  selected : boolean,
}


export const fetchMyAnimalListInfo = async () => {
  return await api.get<AnimalList>("/animal/id001", Header())
}

