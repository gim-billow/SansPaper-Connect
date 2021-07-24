import React from 'react';
import {View} from 'react-native';
import {NavigationComponent, Navigation} from 'react-native-navigation';
import analytics from '@react-native-firebase/analytics';

import OfflineLinkedItemsList from '@containers/OfflineLinkedItemsList';
import styles from './styles';

class OfflineLinkedItems extends NavigationComponent {
  static options = () => {
    const option = {
      topBar: {
        title: {
          text: 'Select Subject',
        },
        backButton: {
          showTitle: false,
        },
      },
      bottomTabs: {
        visible: false,
      },
    };
    return option;
  };

  componentDidAppear() {
    Navigation.events().registerComponentDidAppearListener(
      async ({componentName, componentType}) => {
        if (componentType === 'Component') {
          await analytics().logScreenView({
            screen_name: componentName,
            screen_class: componentName,
          });
        }
      },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <OfflineLinkedItemsList />
      </View>
    );
  }
}

export default OfflineLinkedItems;
