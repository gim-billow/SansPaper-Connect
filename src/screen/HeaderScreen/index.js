import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {robotoMedium, large} from '@styles/font';
import {white} from '@styles/colors';

function HeaderScreen(props) {
  console.tron.log('Header Screen', props);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
  },
  headerTitle: {
    color: white,
    fontFamily: robotoMedium,
    fontSize: large,
  },
});

export default HeaderScreen;
