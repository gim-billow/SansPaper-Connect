import {StyleSheet} from 'react-native';
import {lightGrey, darkGrey} from 'styles/colors';
import {regular} from 'styles/font';
import {red} from '@styles/colors';

export default StyleSheet.create({
  text: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: regular,
  },
  itemText: {
    fontSize: regular,
    paddingVertical: 5,
  },
  container: {
    marginTop: '30%',
    flex: 0,
    height: '70%',
    width: '90%',
    paddingTop: 10,
  },
  selectToggle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: lightGrey,
  },
  button: {
    backgroundColor: red,
  },
  chipsWrapper: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
