export type statisticInfo = {
  plogCount: number;
  sumLength: number;
  hour: number;
  minute: number;
  second: number;
  sumTrash: number;
}

export type badgeInfo = {
  badgeId: string;
  badgeName: string;
  fileUrl: string;
  badgeCondition: string;
  isHave: boolean;
}

export type treeObj = {
  treeName: string;
  userName: string;
  userPhone: string; 
  userEmail: string;
}

export type badgeList = {
  data: badgeInfo[];
}

export type plogObj = {
  ploggingLength: number;
  ploggingTime: number;
  ploggingTrash: number;
}

export type contentList = {
  activityId: number;
  userId: string;
  activityType: string;
  fileUrl: string;
  plogging: null | plogObj;
  tree: null | treeObj;
  createTime: string;
}

export type activityHistory = {
  content: contentList[];
  size: number;
}