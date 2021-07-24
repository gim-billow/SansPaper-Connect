import {Navigation} from 'react-native-navigation';
import {screens} from '@constant/ScreenConstants';

export const pushToLinkedItem = (props) => {
  const {componentId, passProps} = props;
  Navigation.push(componentId, {
    component: {
      id: 'LinkedItems',
      name: 'LinkedItems',
      passProps,
    },
  });
};

export const pushToOfflineLinkedItem = (props) => {
  const {componentId, passProps} = props;
  Navigation.push(componentId, {
    component: {
      id: 'OfflineLinkedItems',
      name: 'OfflineLinkedItems',
      passProps,
    },
  });
};

export const pushToFormFieldsScreen = (props) => {
  const {componentId, currentForm, currentLinkedItems, passProps} = props;
  Navigation.push(componentId, {
    component: {
      id: 'FormFieldsScreen',
      name: 'FormFieldsScreen',
      passProps: {
        ...passProps,
        form: {...currentForm},
        items: [...currentLinkedItems],
      },
    },
  });
};

export const pushToOfflineFormFieldsScreen = (props) => {
  const {componentId, headerData, passProps} = props;

  Navigation.push(componentId, {
    component: {
      id: 'OfflineFormFieldsScreen',
      name: 'OfflineFormFieldsScreen',
      passProps: {
        ...passProps,
        headerData,
      },
    },
  });
};

export const pushToMapScreen = (props) => {
  const {componentId, passProps} = props;
  Navigation.push(componentId, {
    component: {
      id: 'MapScreen',
      name: 'MapScreen',
      passProps,
    },
  });
};
