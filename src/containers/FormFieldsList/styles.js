import {StyleSheet, Platform} from 'react-native';

import {purple, white} from '@styles/colors';
import {regular, questrial} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  offline: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 500,
    backgroundColor: purple,
  },
  offlineText: {
    ...Platform.select({
      ios: {
        textAlign: 'center',
      },
      android: {
        paddingLeft: 30,
      },
    }),
    paddingVertical: 7,
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    color: white,
  },
});
