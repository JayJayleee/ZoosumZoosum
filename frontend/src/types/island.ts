export type timeObj = {
  hour: number;
  minute: number;
  second: number;
};

export type animalForm = {
  animalId: number;
  fileUrl: string;
};

export type islandInfo = {
  islandUrl: string;
  treeUrl: string;
  animalList: animalForm[];
};

export type statusInfo = {
  missionLength: number;
  hour: number;
  minute: number;
  second: number;
  missionTrash: number;
  seed: number;
  treeAllCount: number;
  treeCount: number;
  egg: number;
};