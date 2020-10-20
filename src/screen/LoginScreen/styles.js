import {StyleSheet} from 'react-native';
import {backgroundColor, lightGrey, lightRed, darkRed} from 'styles/colors';
import {medium} from 'styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  box: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: '60%',
  },
  text: {
    marginTop: '10%',
    fontSize: medium,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: medium,
  },
  errorBox: {
    width: '60%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    marginTop: '5%',
    width: '60%',
    height: 40,
    backgroundColor: lightRed,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: darkRed,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});

export const iconProps = {
  color: lightGrey,
  size: 20,
};
