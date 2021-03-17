import {StyleSheet} from 'react-native';
import {medium} from '@styles/font';
import {spaceRegular} from '@styles/space';
import {lightGrey} from '@styles/colors';

export default StyleSheet.create({
  container: {
    padding: spaceRegular,
    backgroundColor: lightGrey,
  },
  text: {
    fontSize: medium,
  },
});
