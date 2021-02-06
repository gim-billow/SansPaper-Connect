import {StyleSheet} from 'react-native';
import {spaceSmall} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed} from '@styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: regular,
  },
  textSet: {
    paddingLeft: 5,
    paddingTop: 10,
    fontSize: 11,
    color: 'grey',
  },
  button: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
    paddingBottom: spaceSmall,
    width: '50%',
  },
  SetDefault: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
    paddingBottom: spaceSmall,
    width: '40%',
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  TextColor: {
    color: lightRed,
  },
  ChangeTextColor: {
    color: 'white',
  },
});
