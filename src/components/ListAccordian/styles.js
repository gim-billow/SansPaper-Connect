import {StyleSheet} from 'react-native';
import {darkGrey, lightGrey} from 'styles/colors';
import {regular} from 'styles/font';

export default StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: darkGrey,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: lightGrey,
  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  text: {
    alignSelf: 'center',
    fontSize: regular,
  },
});
