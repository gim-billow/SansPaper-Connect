import {StyleSheet} from 'react-native';
import {spaceRegular} from '@styles/space';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleContainer: {
    marginBottom: 20,
  },
  // latlng: {
  //   width: 200,
  //   alignItems: 'stretch',
  // },
  // button: {
  //   width: 80,
  //   paddingHorizontal: 12,
  //   alignItems: 'center',
  //   marginHorizontal: 10,
  // },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: spaceRegular,
    right: spaceRegular,
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
