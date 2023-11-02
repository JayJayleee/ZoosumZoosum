import {api, Header} from './index'

type statisticInfo = {
  plogCount: number;
  sumLength: number;
  sumTime: number;
  sumTrash: number;
}

type badgeInfo = {
  badgeId: string;
  badgeName: string;
  fileUrl: string;
  badgeCondition: string;
  isHave: boolean;
}

type treeObj = {
  treeName: string;
  userName: string;
  userPhone: string; 
  userEmail: string;
}

type plogObj = {
  ploggingLength: number;
  ploggingTime: number;
  ploggingTrash: number;
}

type contentList = {
  activityId: number;
  userId: string;
  activityType: string;
  fileUrl: string;
  plogging: null | plogObj;
  tree: null | treeObj;
  createTime: string;
}

type activityHistory = {
  content: contentList;
  last: boolean;
  empty: boolean;
}