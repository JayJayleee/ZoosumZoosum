import {ImageSourcePropType} from 'react-native';

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
  itemType?: string;
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
    addSeed: number;
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

export interface TrashList {
  img: ImageSourcePropType;
  title: string | number;
}

export interface ploggingResultTrash {
  timerValue: number;
  trashCountValue: number;
  ploggingDistanceValue: number;
}
