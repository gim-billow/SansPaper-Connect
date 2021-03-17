import {StyleSheet} from 'react-native';
import {spaceSmall, superSmall, spaceMedium, spaceRegular} from 'styles/space';
import {small} from 'styles/font';
import {
  lightRed,
  darkRed,
  white,
  superLightRed,
  darkGrey,
  lightGrey,
} from '@styles/colors';

export default StyleSheet.create({
  signatureColor: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: lightGrey,
  },
  dimmedSingature: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    marginHorizontal: spaceRegular,
  },
  text: {
    color: lightRed,
    fontSize: small,
  },
  ChangeTextColor: {
    color: white,
    fontSize: small,
  },
  container: {
    marginVertical: spaceMedium,
    paddingVertical: spaceSmall,
  },
  signView: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: lightGrey,
    borderStyle: 'dashed',
    marginHorizontal: spaceRegular,
  },
  droidSignature: {
    flex: 1,
    height: 200,
  },
  signature: {
    paddingHorizontal: spaceRegular,
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: spaceSmall,
    marginHorizontal: spaceRegular,
  },
  leftButton: {
    flex: 1,
    marginRight: superSmall,
  },
  rightButton: {
    flex: 1,
    marginLeft: superSmall,
  },
  buttonColor: {
    backgroundColor: white,
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
});
