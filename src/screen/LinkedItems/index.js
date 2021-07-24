import React from 'react';
import {Text, View} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import LinkedItemsList from '@containers/LinkedItemsList';
import styles from './styles';

class LinkedItems extends NavigationComponent {
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
    const {linkedItemName} = this.props;
    return linkedItemName ? (
      <View style={styles.container}>
        <LinkedItemsList />
      </View>
    ) : (
      <View>
        <Text>form</Text>
      </View>
    );
  }
}

export default LinkedItems;
