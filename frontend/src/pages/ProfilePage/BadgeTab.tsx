import React, { View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';
import { badgeInfo } from '@/types/profile';
import { styles } from './styles';
import { useState } from 'react';
import { BadgeDetailModal } from '@/components/ui/Modal/BadgeDetailModal';

type badgeProps = {
  isMyProfile: boolean;
  nickname: string;
  badgeList:badgeInfo[];
}

export default function BadgeTab({isMyProfile, nickname, badgeList}: badgeProps) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [badgeIntro, setBadgeIntro] = useState<badgeInfo>();

  const openModal = (badge: badgeInfo) => {
    setModalOpen(true)
    setBadgeIntro(badge)
  };

  return (
  <>
  {isModalOpen && 
  <TouchableOpacity style={styles.clickEmpty} onPress={() => setModalOpen(false)}>
    <BadgeDetailModal isModalOpen={isModalOpen} closeFnt={() => {setModalOpen(false)}} badgeInfo={badgeIntro}/>
  </TouchableOpacity>}
    <AppText style={styles.upperTitle} >
      {isMyProfile? "내가 모은 뱃지" :`${nickname}님이\n 모은 뱃지`}
    </AppText>
    <View style={styles.badgeBox}>
      <View style={styles.badgeInner}>
        <ScrollView scrollToOverflowEnabled={true} contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}}>
          {badgeList.map((badge, index) => {
            if (badge.have === true) {
              return (
                <TouchableOpacity activeOpacity={0.6} style={styles.badgeBoxSectionTrue} key={index} onPress={() => openModal(badge)}>
                  <View style={styles.badgeBoxIconTrue}>
                    <FastImage source={{uri: badge.fileUrl}} style={styles.badgeImg}/>
                  </View>
                  <View style={styles.badgeBoxTextSection}>
                    <AppText children={badge.badgeName} style={styles.badgeBoxTitle}/>
                    <AppText children={badge.badgeCondition} style={styles.badgeBoxContent}/>
                  </View>
                </TouchableOpacity>
              )
            } else {
              return (
                <TouchableOpacity activeOpacity={0.6} style={styles.badgeBoxSectionFalse} key={index} onPress={() => openModal(badge)}>
                  <View style={styles.badgeBoxIconFalse}>
                    <Image source={require("@/assets/img_icon/lock_img.png")} style={styles.badgeLockImg}/>
                  </View>
                  <View style={styles.badgeBoxTextSection}>
                    <AppText children={"????"} style={styles.badgeBoxTitle}/>
                    <AppText children={badge.badgeCondition} style={styles.badgeBoxContent}/>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </ScrollView>
      </View>
    </View>
  </>
  )
}
