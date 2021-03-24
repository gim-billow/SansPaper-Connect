import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  icon: {
    paddingRight: Platform.OS === 'android' ? 20 : 0,
  },
});
