import {StyleSheet} from 'react-native';
import {lightGrey, white, darkRed} from 'styles/colors';
import {regular} from '@styles/font';

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
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: regular,
  },
  box: {
    flex: 1,
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
