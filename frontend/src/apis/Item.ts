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
