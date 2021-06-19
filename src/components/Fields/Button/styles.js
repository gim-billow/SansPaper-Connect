import {StyleSheet, Dimensions} from 'react-native';
import {spaceLarge, spaceRegular} from 'styles/space';
import {regular, questrial} from 'styles/font';
import {red, white} from '@styles/colors';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceLarge,
  },
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    width: width / 2,
  },
  button: {
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
