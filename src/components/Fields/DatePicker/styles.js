import {StyleSheet} from 'react-native';
import {superSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {white, darkRed, lightRed} from 'styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  date: {
    fontSize: regular,
    marginTop: superSmall,
    marginHorizontal: spaceRegular,
  },
  defaultBtnStyle: {
    backgroundColor: white,
  },
  btnTxt: {
    color: white,
  },
  alternativeBtnStyle: {
    backgroundColor: darkRed,
  },
  alterBtnText: {
    color: lightRed,
  },
});
