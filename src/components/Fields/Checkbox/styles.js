import {StyleSheet} from 'react-native';
import {lightGrey, white, darkRed} from 'styles/colors';
import {regular} from '@styles/font';
import {spaceSmall} from '@styles/space';

export default StyleSheet.create({
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
  text: {
    paddingLeft: 5,
    paddingTop: 0,
    fontSize: regular,
  },
  box: {
    flex: 1,
    padding: spaceSmall,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  toggle: {
    flex: 1,
    backgroundColor: lightGrey,
    borderRadius: 10,
  },
});
