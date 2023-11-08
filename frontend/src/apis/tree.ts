import {api} from './index';
import {tree} from '@/types/tree';

export const treeApi = async (data: tree) => {
  return await api.post('/userinfo/tree', data);
};
