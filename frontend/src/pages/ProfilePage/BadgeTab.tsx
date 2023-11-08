import React, { View, ScrollView } from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';
import { badgeInfo } from '@/types/profile';

type badgeProps = {
  isMyProfile: boolean;
  nickname: string;
  badgeList:badgeInfo[];
}

export default function BadgeTab({isMyProfile, nickname, badgeList}: badgeProps) {
  return (
  <>
    <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 40, top:30, color: 'white', justifyContent:'center', textAlign: 'center'}} >
      {isMyProfile? "내가 모은 뱃지" :`${nickname}님이 모은 뱃지`}
    </AppText>
    <View style={{width: 400, height: 500, top:50, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        {badgeList.map((badge, index) => {
          return (
            <View style={{width:370, height:90, backgroundColor: 'white', flexDirection: 'row', borderRadius: 10, marginTop: 10, marginBottom: 10, justifyContent:'space-evenly', alignItems: 'center'}} key={index}>
              <FastImage source={{uri: badge.fileUrl}} style={{width: 100, height: 100,}}/>
              <View>
                <AppText children={badge.badgeName} style={{fontSize: 20}}/>
                <AppText children={badge.badgeCondition} style={{fontSize: 12}}/>
                <AppText children={badge.isHave ? "보유" : "미보유"} style={{fontSize: 12}}/>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  </>
  )
}
