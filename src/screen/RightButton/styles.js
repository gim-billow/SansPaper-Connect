import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  icon: {
    marginRight: Platform.OS === 'android' ? 20 : 0,
  },
});
