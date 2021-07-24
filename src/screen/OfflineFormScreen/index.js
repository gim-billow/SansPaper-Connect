import * as React from 'react';
import {View} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import Outbox from '@containers/Outbox';
import styles from './styles';

class OfflineFormScreen extends NavigationComponent {
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
        <Outbox />
      </View>
    );
  }
}

export default OfflineFormScreen;
