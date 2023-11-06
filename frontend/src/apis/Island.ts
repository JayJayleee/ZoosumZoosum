import {api, Header} from './index';
import { timeObj, animalForm, islandInfo, statusInfo  } from '@/types/island';

export const fetchMyIslandInfo = async () => {
  return await api.get<islandInfo>('/userinfo/main', await Header());
};

export const fetchMyStatusInfo = async () => {
  return await api.get<statusInfo>('/userinfo/mission', await Header());
};
