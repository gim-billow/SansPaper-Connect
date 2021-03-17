import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {lightRed, darkRed, white, superLightRed} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  canvasStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    // borderWidth: 1,
    // borderColor: lightRed,
  },
  sketch: {
    flex: 1,
    position: 'absolute',
    backgroundColor: superLightRed,
    borderWidth: 1,
    borderColor: lightRed,
  },
  text: {
    color: lightRed,
    fontSize: 14,
  },
  ChangeTextColor: {
    color: white,
    fontSize: 13,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spaceSmall,
  },
  button: {
    paddingVertical: spaceSmall,
    paddingLeft: spaceSmall,
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
});
