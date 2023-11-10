import {api, Header} from './index';
import { animalForm, islandInfo, statusInfo  } from '@/types/island';

export const fetchMyIslandInfo = async () => {
  return await api.get<islandInfo>('/userinfo/main', await Header());
};

export const fetchMyStatusInfo = async () => {
  return await api.get<statusInfo>('/userinfo/mission', await Header());
};

export const getNewAnimalPose = async (animalId: number, fileUrl: string) => {
  return await api.get<animalForm>(`/animal/new?animalId=${animalId}&fileUrl=${fileUrl}`, await Header());
}
