// 캐롯셸 내 동물 카드용 props
export interface AnimalCarouselCardItemProps {
  item: {
    fileUrl: string;
    animalName: string;
    description: string;
    animalId: string;
  };
  index: number;
  activeIndex?: number;
}

export interface CarouselCardItemProps {
  item: {
    fileUrl: string;
    badgeName: string;
  };
  index: number;
  activeIndex?: number;
}

export interface ItemCarouselCardItemProps {
  item: {
    fileUrl: string;
    itemName: string;
  };
  index: number;
  activeIndex?: number;
}

export interface CarouselProps {
  item: any;
  index: any;
  activeIndex?: any;
}

export interface AnimatedProgressCircleProps {
  progress: number;
  duration?: number;
}

export interface ProgressCarouselCardItemProps {
  item: {
    missonTrash: number;
    missonLength: number;
    missonTime: number;
  };
  index: number;
  activeIndex?: number;
}

export interface SeedCarouselCardItemProps {
  item: {
    totalRewardCount: number;
    badgeRewardCount: string;
    itemRewardCount: number;
    animalRewardCount: number;
    seedCount: number;
  };
  index: number;
  activeIndex?: number;
}

export interface EffectProps {
  style?: object;
}

export interface NewData {
  missionList: Array<{
    missionTrash: number;
    missionLength: number;
    missionTime: number;
  }>;
  islandList: Array<ItemType>;
  treeList: Array<ItemType>;
  animalList: Array<AnimalType>;
  seedList: Array<{addSeed: number}>;
  scoreList: Array<{addScore: number}>;
  userBadgeList: Array<BadgeType>;
}

export interface ItemType {
  itemId: number;
  itemName: string;
  itemType: string;
  fileUrl: string;
  selected: null | string; // null 혹은 다른 값을 가질 수 있으면 이렇게 표현
}

export interface AnimalType {
  animalId: number;
  animalName: string;
  description: string;
  fileUrl: string;
}

export interface BadgeType {
  badgeId: string;
  badgeName: string;
  badgeCondition: string;
  fileUrl: string;
}
