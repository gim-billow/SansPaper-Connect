import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed} from '@styles/colors';

export default StyleSheet.create({
  signatureColor: {
    flex: 1,
    backgroundColor: '#ffb3b3',
    borderWidth: 1,
    borderColor: lightRed,
  },
  label: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceMedium,
    paddingBottom: spaceSmall,
  },
  text: {
    color: lightRed,
    fontSize: 12,
  },
  changeText: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    width: 400,
    height: 260,
  },
  signature: {
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
    width: '92%',
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
  },
  button: {
    paddingTop: spaceSmall,
    paddingBottom: spaceSmall,
    width: '46%',
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  changeButtonColor: {
    backgroundColor: 'red',
  },
});
