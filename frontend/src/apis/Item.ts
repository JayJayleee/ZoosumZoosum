import {api, Header} from './index';


type ApiResponse = {
  data: Item[];
};

type Item = {
  itemId: number;
  itemName: string;
  itemType: string;
  fileUrl: string;
  selected: boolean;
};

export const fetchMyItemListInfo = async (itemtype : string) => {
  return await api.get<ApiResponse>(`/item?itemType=${itemtype}`, await Header());
};
export const fetchSelectMyTree = async (itemId : number) => {
  const data = { itemId }; // 요청 본문에 itemId를 포함하는 객체를 생성

  try {
    const response = await api.put('/item?itemType=TREE', data, await Header());
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchSelectMyIsland = async (itemId: number) => {
  const data = { itemId }; // 요청 본문에 itemId를 포함하는 객체를 생성

  try {
    const response = await api.put('/item?itemType=ISLAND', data, await Header());
    return response;
  } catch (error) {
    throw error;
  }
};