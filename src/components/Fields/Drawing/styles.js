import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed, white} from '@styles/colors';

export default StyleSheet.create({
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
    backgroundColor: '#EEEBEB',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
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
  ChangeTextColor: {
    color: white,
    fontSize: 13,
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
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    height: 500,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
  },
});
