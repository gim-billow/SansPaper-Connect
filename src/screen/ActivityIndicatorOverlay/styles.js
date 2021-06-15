import {StyleSheet} from 'react-native';
import {regular} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loaderView: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // marginHorizontal: 100,
  },
  text: {
    // color: 'white',
    fontSize: regular,
    // fontWeight: 'bold',
    alignSelf: 'center',
  },
  messages: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    // paddingLeft: 20,
    // paddingRight: 20,
    // marginTop: 20,
  },
});
