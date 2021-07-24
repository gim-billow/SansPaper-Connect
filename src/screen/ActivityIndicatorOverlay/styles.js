import {StyleSheet} from 'react-native';
import {regular, questrial} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loaderView: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: regular,
    fontFamily: questrial,
    alignSelf: 'center',
  },
  messages: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
});
