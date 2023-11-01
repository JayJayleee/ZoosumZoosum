const data = {
  resposeRewardDto: {
    // 미션 전체 값에 해당하는 항목(임시로 지음)
    missonTrashLimit: 1,
    missonLengthLimit: 0,
    missonTimeLimit: 0,
    // 미션에 해당하는 각 항목
    missonTrash: 0,
    missonLength: 0,
    missonTime: 0,
    // 전체 리워드 수
    totalRewardCount: 0,
    // 뱃지 리워드 수
    badgeRewardCount: 0,
    // 아이템 리워드 수
    itemRewardCount: 0,
    // 정령 리워드 수
    animalRewardCount: 0,
    // 씨앗 리워드 수
    seedCount: 1,
    // 뱃지 리워드 리스트
    badgeRewardList: [
      {
        badgeId: 'TRASHH001',
        badgeCondition: 100,
        badgeName: '왕왕 좋은 뱃지',
        fileUrl: 'https://i.imgur.com/VH8N3fp.png',
      },
      {
        badgeId: 'TRASHH002',
        badgeCondition: 100,
        badgeName: '왕왕 좋은 뱃지',
        fileUrl: 'https://i.imgur.com/VH8N3fp.png',
      },
    ],
    // 아이템 리워드 리스트
    itemRewardList: [
      {
        itemId: 1,
        category: '어쩌구',
        itemName: '저쩌구',
        fileUrl: 'https://i.imgur.com/OaawnLC.png',
      },
      {
        itemId: 2,
        category: '와웅',
        itemName: '웅와',
        fileUrl: 'https://i.imgur.com/OaawnLC.png',
      },
    ],
    //동물 리워드 리스트
    animalRewardList: [
      {
        animalId: 1,
        animalName: '사슴이',
        description: '사슴이는 사실 사슴임',
        fileUrl: 'https://i.imgur.com/VH8N3fp.png',
      },
      {
        animalId: 1,
        animalName: '멍멍이',
        description: '멍멍이는 사실 개임',
        fileUrl: 'https://i.imgur.com/VH8N3fp.png',
      },
    ],
  },
};
export default data;
