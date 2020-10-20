import {StyleSheet} from 'react-native';
import {red, darkRed} from './colors';
import {small} from './font';

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
