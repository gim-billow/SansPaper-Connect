import {StyleSheet} from 'react-native';
import {spaceSmall, spaceRegular, spaceMedium} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  date: {
    marginHorizontal: spaceRegular,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  TextColor: {
    color: lightRed,
  },
  ChangeTextColor: {
    color: 'white',
  },
});
