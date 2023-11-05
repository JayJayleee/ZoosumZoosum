import {api, Header} from './index';

type animalForm = {
  animalId: number;
  animalFileUrl: string;
};

type islandInfo = {
  userId: string;
  island: string;
  tree: string;
  animalList: Array<animalForm>;
};

type statusInfo = {
  missionLength: number;
  missionTime: number;
  missionTrash: number;
  seed: number;
  treeAllCount: number;
  treeCount: number;
};

export const fetchMyIslandInfo = async () => {
  return await api.get<islandInfo>('/userinfo/main', await Header());
};

export const fetchMyStatusInfo = async () => {
  return await api.get<statusInfo>('/userinfo/mission', await Header());
};
