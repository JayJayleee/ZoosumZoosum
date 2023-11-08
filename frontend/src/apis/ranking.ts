import {api, Header} from './index';

type ApiResponse = {
  data: Rank[];
};

type Rank = {
  nickname: string;
  region: string;
  score: number;
};

export const fetchMyTopRankingListInfo = async () => {
  return await api.get<ApiResponse>('/ranking?sort=score,desc&size=50', await Header());
};

export const fetchMyRegionRankingListInfo = async (region : string) => {
  return await api.get<ApiResponse>(`/ranking?region=${region}&sort=score,desc&size=5`, await Header());
};
