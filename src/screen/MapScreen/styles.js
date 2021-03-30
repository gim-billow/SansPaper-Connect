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
    marginHorizontal: 15,
    borderRadius: 20,
  },
  bubbleContainer: {
    marginBottom: 20,
  },
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
