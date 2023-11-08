import React, { View, ScrollView, Image } from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';
import { badgeInfo } from '@/types/profile';
import { styles } from './styles';

type badgeProps = {
  isMyProfile: boolean;
  nickname: string;
  badgeList:badgeInfo[];
}

export default function BadgeTab({isMyProfile, nickname, badgeList}: badgeProps) {
  return (
  <>
    <AppText style={styles.upperTitle} >
      {isMyProfile? "내가 모은 뱃지" :`${nickname}님이 모은 뱃지`}
    </AppText>
    <View style={styles.badgeBox}>
      <View style={styles.badgeInner}>
        <ScrollView scrollToOverflowEnabled={true} contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}}>
          {badgeList.map((badge, index) => {
            if (badge.isHave === true) {
              return (
                <View style={styles.badgeBoxSectionTrue} key={index}>
                  <FastImage source={{uri: badge.fileUrl}} style={styles.badgeBoxIconTrue}/>
                  <View>
                    <AppText children={badge.badgeName} style={styles.badgeBoxTitle}/>
                    <AppText children={badge.badgeCondition} style={styles.badgeBoxContent}/>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={styles.badgeBoxSectionFalse} key={index}>
                  <View style={styles.badgeBoxIconFalse}>
                    <Image source={require("@/assets/img_icon/lock_img.png")} style={styles.badgeLockImg}/>
                  </View>
                  <View style={styles.badgeBoxTextSection}>
                    <AppText children={"????"} style={styles.badgeBoxTitle}/>
                    <AppText children={badge.badgeCondition} style={styles.badgeBoxContent}/>
                  </View>
                </View>
              )
            }
          })}
        </ScrollView>
      </View>
    </View>
  </>
  )
}
