import {StyleSheet, Platform} from 'react-native';
import {spaceSmall, superSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular, small} from 'styles/font';
import {lightRed, darkRed, white, superLightRed} from '@styles/colors';
import {} from '../../../styles/space';

export default StyleSheet.create({
  signatureColor: {
    backgroundColor: superLightRed,
  },
  dimmedSingature: {
    // position: 'absolute',
    // backgroundColor: 'rgba(200, 200, 200, 0.8)',
    // width: '100%',
    // height: '100%',
    // marginLeft: Platform.OS === 'android' ? 0 : 10,
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
    marginVertical: spaceRegular,
    paddingVertical: spaceRegular,
  },
  droidSignature: {
    marginHorizontal: spaceRegular,
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
