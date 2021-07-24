import {StyleSheet} from 'react-native';
import {lightGrey, white, darkRed} from 'styles/colors';
import {spaceMedium} from '@styles/space';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  checked: {
    backgroundColor: white,
    borderColor: darkRed,
    borderWidth: 2,
  },
  checkedii: {
    backgroundColor: darkRed,
    borderColor: darkRed,
  },
  unchecked: {
    backgroundColor: white,
    borderColor: lightGrey,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: spaceRegular,
  },
  toggle: {
    flex: 1,
    backgroundColor: lightGrey,
    borderRadius: 10,
  },
});
