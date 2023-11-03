import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import AppText from '../../Text';
import MapView, {Marker} from 'react-native-maps';

export default function GoogleMap() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContent}
        initialRegion={{
          latitude: 36.355310121164976,
          longitude: 127.29831449628637,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 36.355310121164976,
            longitude: 127.29831449628637,
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
}
