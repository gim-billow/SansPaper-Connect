import {Navigation} from 'react-native-navigation';

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
