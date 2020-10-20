import appScreens from './AppScreens';
import * as navigation from '@navigation';

const startApp = async () => {
  navigation.setDefaultOptions();
  return navigation.showInitialScreen();
};

export {startApp, appScreens};
