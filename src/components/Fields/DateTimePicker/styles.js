import {StyleSheet} from 'react-native';
import {spaceRegular, spaceMedium} from 'styles/space';
import {regular, questrial} from 'styles/font';
import {white, red} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    flexDirection: 'row',
    marginTop: spaceRegular,
  },
  btnContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginRight: 10,
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
