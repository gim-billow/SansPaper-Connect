import {Navigation} from 'react-native-navigation';

import Octicons from 'react-native-vector-icons/Octicons';

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
      backgroundColor: red,
    },
    topBar: {
      background: {
        color: red,
      },
      noBorder: true,
      elevation: 0,
      title: {
        color: white,
        fontSize: regular,
        fontFamily: questrial,
      },
      backButton: {
        color: white,
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
  // const bookOpenIcon = require('../assets/book.png');
  // const clipboardIcon = require('../assets/form.png');
  // const userIcon = require('../assets/profile.png');
  // const outboxIcon = require('../assets/outbox.png');

  // vector icon source
  const vectorBookIcon = await Octicons.getImageSource('book', 25);
  const vectorFormIcon = await Octicons.getImageSource('clippy', 25);
  const vectorOutboxIcon = await Octicons.getImageSource('inbox', 25);
  const vectorUserIcon = await Octicons.getImageSource('organization', 25);

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
                        title: {
                          component: {
                            id: 'HeaderScreen-BOK',
                            name: screens.HeaderScreen,
                            alignment: 'fill',
                            passProps: {
                              title: 'Body Of Knowledge',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'BoK',
                  icon: vectorBookIcon,
                  iconColor: darkGrey,
                  fontFamily: questrial,
                  selectedIcon: vectorBookIcon,
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
                        title: {
                          component: {
                            id: 'HeaderScreen-FORMS',
                            name: screens.HeaderScreen,
                            alignment: 'fill',
                            passProps: {
                              title: 'Forms',
                            },
                          },
                        },
                        rightButtons: [
                          {
                            id: screens.SyncButton,
                            component: {
                              name: screens.SyncButton,
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Form',
                  fontFamily: questrial,
                  icon: vectorFormIcon,
                  iconColor: darkGrey,
                  selectedIcon: vectorFormIcon,
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
                        title: {
                          component: {
                            id: 'HeaderScreen-OUTBOX',
                            name: screens.HeaderScreen,
                            alignment: 'fill',
                            passProps: {
                              title: 'Outbox (Local Storage)',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Outbox',
                  fontFamily: questrial,
                  iconColor: darkGrey,
                  icon: vectorOutboxIcon,
                  selectedIcon: vectorOutboxIcon,
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
                        title: {
                          component: {
                            id: 'HeaderScreen-PROFILE',
                            name: screens.HeaderScreen,
                            alignment: 'fill',
                            passProps: {
                              title: 'Profile',
                            },
                          },
                        },
                      },
                    },
                    passProps: {
                      loadingImg: true,
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Profile',
                  fontFamily: questrial,
                  iconColor: darkGrey,
                  icon: vectorUserIcon,
                  selectedIcon: vectorUserIcon,
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

export const updateProfileLoadingScreen = (loading) => {
  Navigation.updateProps(screens.ProfileScreen, {
    loadingImg: loading,
  });
};
