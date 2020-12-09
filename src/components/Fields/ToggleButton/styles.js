import {StyleSheet} from 'react-native';
import {medium, regular} from '@styles/font';
import {spaceSmall} from '@styles/space';
import {lightGrey, red} from '@styles/colors';

export default StyleSheet.create({
  container: {
    padding: spaceSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: medium,
  },
  label: {
    paddingLeft: spaceSmall,
    paddingTop: spaceSmall,
    color: lightGrey,
    fontSize: regular,
  },
  button: {
    borderWidth: 1,
    width: '50%',
    height: 40,
    borderRadius: 5,
    borderColor: red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBackground: {
    backgroundColor: red,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  redColor: {
    color: red,
  },
  whiteColor: {
    color: 'white',
  },
});
