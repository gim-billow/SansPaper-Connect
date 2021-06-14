import {screens} from '../constant/ScreenConstants';
import ActivityIndicatorOverlay from './ActivityIndicatorOverlay';
import InitialScreen from './InitialScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import FormScreen from './FormScreen';
import FormFieldsScreen from './FormFieldsScreen';
import LinkedItems from './LinkedItems';

import RightButton from './RightButton';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';
import SelectMap from './MapScreen/SelectMap';
import OfflineFormScreen from './OfflineFormScreen';
import OfflineLinkedItems from './OfflineLinkedItems';
import OfflineFormFieldsScreen from './OfflineFormFieldsScreen';

const appScreens = new Map();

appScreens.set(screens.ActivityIndicatorOverlay, ActivityIndicatorOverlay);
appScreens.set(screens.InitialScreen, InitialScreen);
appScreens.set(screens.LoginScreen, LoginScreen);
appScreens.set(screens.MainScreen, MainScreen);
appScreens.set(screens.FormScreen, FormScreen);
appScreens.set(screens.OfflineFormScreen, OfflineFormScreen);
appScreens.set(screens.OfflineFormFieldsScreen, OfflineFormFieldsScreen);
appScreens.set(screens.FormFieldsScreen, FormFieldsScreen);
appScreens.set(screens.LinkedItems, LinkedItems);
appScreens.set(screens.OfflineLinkedItems, OfflineLinkedItems);
appScreens.set(screens.RightButton, RightButton);
appScreens.set(screens.ProfileScreen, ProfileScreen);
appScreens.set(screens.MapScreen, MapScreen);
appScreens.set(screens.SelectMap, SelectMap);

export default appScreens;
