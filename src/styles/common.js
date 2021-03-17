import {StyleSheet, Dimensions} from 'react-native';

import {red, darkRed} from './colors';
import {small, regular} from './font';
import {spaceRegular} from 'styles/space';

const {height} = Dimensions.get('screen');
export const customHeight = height / 1.5;
const h = height / 2;
export const centerPos = h / 2;

//Error style
export const errorStyle = StyleSheet.create({
  text: {
    color: red,
    fontSize: small,
  },
});

export const borderStyle = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
  },
});

export const colorStyle = StyleSheet.create({
  black: {
    color: 'black',
  },
  darkRed: {
    color: darkRed,
  },
});

export const commonStyles = StyleSheet.create({
  spacing: {
    paddingVertical: 2,
  },
  text: {
    fontSize: regular,
    paddingHorizontal: spaceRegular,
  },
});
