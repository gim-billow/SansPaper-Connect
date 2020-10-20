import {screens} from '../constant/ScreenConstants';
import InitialScreen from './InitialScreen';
import LoginScreen from './LoginScreen';

const appScreens = new Map();

appScreens.set(screens.InitialScreen, InitialScreen);
appScreens.set(screens.LoginScreen, LoginScreen);

export default appScreens;
