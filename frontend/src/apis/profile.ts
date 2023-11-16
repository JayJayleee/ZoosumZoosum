import {api, Header} from './index'
import { statisticInfo, badgeList, activityHistory } from '@/types/profile'

export const getStatisticInfo = async (nickName: string) => {
  return await api.get<statisticInfo>(`/userinfo/plog/${nickName}`, await Header())
}

export const getBadgeInfo = async (nickName: string) => {
  return await api.get<badgeList>(`/userinfo/badge/${nickName}`, await Header())
}

export const getActivityInfo = async (nickName: string, page: number, size: number) => {
  return await api.get<activityHistory>(`/activity/${nickName}?page=${page}&size=${size}`, await Header())
}

export const getActivityTreeInfo = async (nickName: string, page: number, size: number) => {
  return await api.get<activityHistory>(`/activity/${nickName}?page=${page}&size=${size}&activityType=TREE`, await Header())
}

export const getActivityPlogInfo = async (nickName: string, page: number, size: number) => {
  return await api.get<activityHistory>(`/activity/${nickName}?page=${page}&size=${size}&activityType=PLOG`, await Header())
}