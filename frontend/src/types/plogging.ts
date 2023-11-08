import {ImageSourcePropType} from 'react-native';
import {tree} from './tree';
export interface AnimalCarouselCardItemProps {
  item?: {
    fileUrl: string;
    animalName: string;
    description: string;
    animalId: string;
  };
  index: number;
  activeIndex?: number;
}

export interface CarouselCardItemProps {
  item?: {
    fileUrl: string;
    badgeName: string;
  };
  index: number;
  activeIndex?: number;
}

export interface ItemCarouselCardItemProps {
  item?: {
    fileUrl: string;
    itemName: string;
  };
  index: number;
  activeIndex?: number;
  itemType?: string;
}

export interface CarouselProps {
  item?: any;
  index: any;
  activeIndex?: any;
}

export interface AnimatedProgressCircleProps {
  progress: number;
  duration?: number;
}

export interface ProgressCarouselCardItemProps {
  item: {
    missionTrash: number;
    missionLength: number;
    missionTime: number;
  };
  index: number;
  activeIndex?: number;
}

export interface SeedCarouselCardItemProps {
  item?: {
    addSeed: number;
  };
  index: number;
  activeIndex?: number;
}

export interface TreeCarouselCardItemProps {
  item?: {
    image: ImageSourcePropType;
    description: string;
    btn: string;
  };
  index: number;
  onUserData?: (data: tree) => void;
  errorAlert?: () => void;
}

export interface EffectProps {
  style?: object;
}

export interface NewData {
  missionList?: Array<{
    missionTrash?: number;
    missionLength?: number;
    missionTime?: number;
  }>;
  islandList?: Array<ItemType>;
  treeList?: Array<ItemType>;
  animalList?: Array<AnimalType>;
  seedList?: Array<{addSeed: number}>;
  scoreList?: Array<{addScore: number}>;
  userBadgeList?: Array<BadgeType>;
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

export interface TrashDataReturnList {
  img: ImageSourcePropType;
  title: string | number;
  description: number;
}

export interface ploggingResultTrash {
  timerValue: number;
  trashCountValue: number;
  ploggingDistanceValue: number;
}

export interface ActivityDataType {
  activityImg: string; // 이미지에 대한 타입을 가정
  activityRequestDto: {
    length: number;
    time: number;
    trash: number;
  };
}

export interface TrashDaTaList {
  general_trash: number;
  glass: number;
  metal: number;
  paper: number;
  plastic: number;
  plastic_bag: number;
  total: number;
}
