import {StyleSheet} from 'react-native';
import {lightGrey, darkGrey} from 'styles/colors';
import {regular} from 'styles/font';
import { red } from '@styles/colors';

export default StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: regular,
  },
  container: {
    marginTop: '30%',
    flex: 0,
    height: '70%',
    width: '90%',
  },
  listContainer: {
    height: 500,
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
  selectedItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  button: {
    backgroundColor: red,
  },
});
