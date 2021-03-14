import {screens} from '@constant/ScreenConstants';
import {red} from '@styles/colors';
import {Navigation} from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {regular} from '@styles/font';

export const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
    },
    topBar: {
      animate: true,
      hideOnScroll: false,
      background: {
        color: red,
      },
      title: {
        color: 'white',
        fontSize: regular,
      },
      backButton: {
        color: 'white',
      },
    },
  });
};

export const showInitialScreen = () => {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: screens.InitialScreen,
              name: screens.InitialScreen,
            },
          },
        ],
      },
    },
  });
};

export const showLoginScreen = () => {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: screens.LoginScreen,
              name: screens.LoginScreen,
            },
          },
        ],
      },
    },
  });
};

export const showMainScreen = async () => {
  const homeIcon = await Ionicons.getImageSource('md-home', 25);
  const formIcon = await MaterialCommunityIcons.getImageSource(
    'clipboard-outline',
    25,
  );
  const userIcon = await FontAwesome5.getImageSource('user', 25);
  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'MAIN_TAB',
              children: [
                {
                  component: {
                    id: screens.MainScreen,
                    name: screens.MainScreen,
                    options: {
                      topBar: {
                        visible: true,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Main',
                  icon: homeIcon,
                },
              },
            },
          },
          {
            stack: {
              id: 'FORM_TAB',
              children: [
                {
                  component: {
                    id: screens.FormScreen,
                    name: screens.FormScreen,
                    options: {
                      topBar: {
                        visible: true,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Form',
                  icon: formIcon,
                },
              },
            },
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: screens.ProfileScreen,
                    name: screens.ProfileScreen,
                    options: {
                      topBar: {
                        visible: true,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: userIcon,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const showActivityIndicator = () => {
  Navigation.showOverlay({
    component: {
      id: screens.ActivityIndicatorOverlay,
      name: screens.ActivityIndicatorOverlay,
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
        layout: {
          componentBackgroundColor: 'transparent',
        },
      },
    },
  });
};

export const dismissActivityIndicator = () => {
  Navigation.dismissOverlay(screens.ActivityIndicatorOverlay);
};
