import {StyleSheet, Dimensions} from 'react-native';

import {red, darkRed, altRed, white, darkGrey} from './colors';
import {small, regular, questrial, robotoMedium, medium} from './font';

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
  title: {
    fontSize: 16,
    fontFamily: robotoMedium,
    color: '#000',
  },
  text: {
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    color: '#000',
  },
  actionSheetAndroid: {
    fontFamily: questrial,
    color: darkGrey,
    letterSpacing: 0.2,
  },
  labelView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const cardStyle = StyleSheet.create({
  shadow: {
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export const searchBarStyle = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // marginHorizontal: 5,
    padding: 0,
    marginTop: 20,
  },
  searchInputContainer: {
    borderRadius: 15,
    backgroundColor: altRed,
  },
  searchInput: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: white,
  },
});
