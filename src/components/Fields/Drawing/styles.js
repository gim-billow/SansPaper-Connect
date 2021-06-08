import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {lightRed, darkRed, white} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  canvasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sketch: {
    flex: 1,
    flexDirection: 'row',
    height: 500,
  },
  text: {
    color: lightRed,
    fontSize: 14,
  },
  ChangeTextColor: {
    color: white,
    fontSize: 13,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: spaceSmall,
    // paddingLeft: spaceSmall,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  box: {
    height: 500,
    marginHorizontal: spaceRegular,
  },
  dimmedSingature: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    bottom: 60,
    backgroundColor: 'transparent',
    marginHorizontal: spaceRegular,
  },
  canvasWrapper: {
    flexDirection: 'row',
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
