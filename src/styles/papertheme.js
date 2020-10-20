import {DefaultTheme} from 'react-native-paper';
import {darkRed} from './colors';
import {regular} from './font';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkRed,
    background: 'white',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: regular,
      color: 'black',
    },
  },
};
