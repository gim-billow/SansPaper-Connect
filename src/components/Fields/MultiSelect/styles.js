import {StyleSheet} from 'react-native';
import {lightGrey} from '@styles/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  hintText: {
    fontSize: 14,
    color: lightGrey,
    textAlign: 'left',
  },
});
