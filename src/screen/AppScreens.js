import {screens} from '../constant/ScreenConstants';
import InitialScreen from './InitialScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import FormScreen from './FormScreen';
import FormFieldsScreen from './FormFieldsScreen';
import LinkedItems from './LinkedItems';
import ActivityIndicatorOverlay from './ActivityIndicatorOverlay';
import RightButton from './RightButton';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';
import SelectMap from './MapScreen/SelectMap';

const appScreens = new Map();

appScreens.set(screens.InitialScreen, InitialScreen);
appScreens.set(screens.LoginScreen, LoginScreen);
appScreens.set(screens.MainScreen, MainScreen);
appScreens.set(screens.FormScreen, FormScreen);
appScreens.set(screens.FormFieldsScreen, FormFieldsScreen);
appScreens.set(screens.LinkedItems, LinkedItems);
appScreens.set(screens.ActivityIndicatorOverlay, ActivityIndicatorOverlay);
appScreens.set(screens.RightButton, RightButton);
appScreens.set(screens.ProfileScreen, ProfileScreen);
appScreens.set(screens.MapScreen, MapScreen);
appScreens.set(screens.SelectMap, SelectMap);

export default appScreens;
