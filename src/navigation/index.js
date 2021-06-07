import {screens} from '@constant/ScreenConstants';
import {red} from '@styles/colors';
import {Navigation} from 'react-native-navigation';
import FontAwesome5, {FA5Style} from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
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
  const userIcon = await FontAwesome5.getImageSource('user', 25);
  const userIconSelect = await FontAwesome5.getImageSource(
    'user',
    25,
    red,
    FA5Style.solid,
  );
  const clipboardIcon = await Feather.getImageSource('clipboard', 25);
  const clipboardIconSelect = await FontAwesome5.getImageSource(
    'clipboard',
    25,
    red,
    FA5Style.solid,
  );
  const bookOpenIcon = await Feather.getImageSource('book-open', 25);
  const bookOpenIconSelect = await FontAwesome5.getImageSource('book-open', 25);
  const downloadIcon = await FontAwesome5.getImageSource('hdd', 25);
  const downloadIconSelect = await FontAwesome5.getImageSource(
    'hdd',
    25,
    red,
    FA5Style.solid,
  );

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
                  text: 'BoK',
                  icon: bookOpenIcon,
                  selectedIcon: bookOpenIconSelect,
                  selectedIconColor: red,
                  selectedTextColor: red,
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
                  icon: clipboardIcon,
                  selectedIcon: clipboardIconSelect,
                  selectedIconColor: red,
                  selectedTextColor: red,
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
                  selectedIcon: userIconSelect,
                  selectedIconColor: red,
                  selectedTextColor: red,
                },
              },
            },
          },
          {
            stack: {
              id: 'OFFLINE_FORM_TAB',
              children: [
                {
                  component: {
                    id: screens.OfflineFormScreen,
                    name: screens.OfflineFormScreen,
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
                  text: 'Outbox',
                  icon: downloadIcon,
                  selectedIcon: downloadIconSelect,
                  selectedIconColor: red,
                  selectedTextColor: red,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const showActivityIndicator = (messages = '') => {
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
      passProps: {
        messages,
      },
    },
  });
};

export const dismissActivityIndicator = () => {
  Navigation.dismissOverlay(screens.ActivityIndicatorOverlay);
};
