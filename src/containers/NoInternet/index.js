import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {white} from '@styles/colors';

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
});

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/no-internet.png')}
        resizeMode="contain"
        style={{width: width - 50}}
      />
    </View>
  );
};

export default NoInternet;
