import {StyleSheet, Dimensions} from 'react-native';
import {spaceRegular, spaceMedium} from 'styles/space';
import {regular, questrial} from 'styles/font';
import {lightRed, darkRed, white, red} from '@styles/colors';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    width: width / 2,
  },
  date: {
    fontSize: regular,
    marginTop: spaceRegular,
  },
  disableText: {
    color: white,
  },
  disable: {
    backgroundColor: red,
  },
  title: {
    fontFamily: questrial,
    letterSpacing: 0.5,
    fontSize: regular,
  },
});
