import {Navigation} from 'react-native-navigation';
// import FontAwesome5, {FA5Style} from 'react-native-vector-icons/FontAwesome5';
// import Feather from 'react-native-vector-icons/Feather';

import {screens} from '@constant/ScreenConstants';
import {red, white, darkGrey} from '@styles/colors';
import {regular, questrial} from '@styles/font';

export const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
    },
    statusBar: {
      style: 'light',
    },
    topBar: {
      animate: true,
      hideOnScroll: false,
      background: {
        color: red,
      },
      noBorder: true,
      elevation: 0,
      title: {
        color: 'white',
        fontSize: regular,
        fontFamily: questrial,
      },
      backButton: {
        color: 'white',
      },
    },
    bottomTabs: {
      backgroundColor: white,
      hideShadow: true,
      elevation: 0,
      titleDisplayMode: 'alwaysShow',
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
  const bookOpenIcon = require('../assets/book.png');
  const clipboardIcon = require('../assets/form.png');
  const userIcon = require('../assets/profile.png');
  const outboxIcon = require('../assets/outbox.png');
  /** Profile */
  // const userIcon = await FontAwesome5.getImageSource('user', 25);
  // const userIconSelect = await FontAwesome5.getImageSource(
  //   'user',
  //   25,
  //   red,
  //   FA5Style.solid,
  // );
  /** FORM */
  // const clipboardIcon = await Feather.getImageSource('clipboard', 25);
  // const clipboardIconSelect = await FontAwesome5.getImageSource(
  //   'clipboard',
  //   25,
  //   red,
  //   FA5Style.solid,
  // );
  /** BOK */
  // const bookOpenIcon = await Feather.getImageSource('book-open', 25);
  // const bookOpenIconSelect = await FontAwesome5.getImageSource('book-open', 25);
  /** OUTBOX */
  // const downloadIcon = await FontAwesome5.getImageSource('save', 25);
  // const downloadIconSelect = await FontAwesome5.getImageSource(
  //   'save',
  //   25,
  //   red,
  //   FA5Style.solid,
  // );

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
                  text: 'BOK',
                  icon: bookOpenIcon,
                  iconColor: darkGrey,
                  fontFamily: questrial,
                  selectedIcon: bookOpenIcon,
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
                  text: 'FORM',
                  fontFamily: questrial,
                  icon: clipboardIcon,
                  iconColor: darkGrey,
                  selectedIcon: clipboardIcon,
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
                  text: 'OUTBOX',
                  fontFamily: questrial,
                  iconColor: darkGrey,
                  icon: outboxIcon,
                  selectedIcon: outboxIcon,
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
                  text: 'PROFILE',
                  fontFamily: questrial,
                  iconColor: darkGrey,
                  icon: userIcon,
                  selectedIcon: userIcon,
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
