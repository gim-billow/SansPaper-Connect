import {StyleSheet} from 'react-native';
import {regular} from 'styles/font';
import {red, lightGrey} from '@styles/colors';

export default StyleSheet.create({
  // container: {
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  // },
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
});
