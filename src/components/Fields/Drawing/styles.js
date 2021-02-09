import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed} from '@styles/colors';

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  canvasStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    borderWidth: 1,
    borderColor: lightRed,
  },
  sketch: {
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
    fontSize: 14,
  },
  container: {
    width: 400,
    height: 260,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
  },
  button: {
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingBottom: spaceSmall,
    width: '100%',
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    height: 500,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
  },
});
