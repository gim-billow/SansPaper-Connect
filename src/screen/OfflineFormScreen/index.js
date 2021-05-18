import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { red } from '@styles/colors';
import OfflineFormList from '@containers/OfflineFormList';
import Outbox from '@containers/Outbox';

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: OfflineFormList,
  second: Outbox,
});

const OfflineFormScreen = (props) =>{
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Forms' },
    { key: 'second', title: 'Outbox' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

OfflineFormScreen.options = {
  topBar: {
    title: {
      text: 'Local',
    },
    backButton: {
      showTitle: false,
    },
  },
  statusBar: {
    visible: true,
    backgroundColor: red,
    styles: 'light',
  },
};

export default OfflineFormScreen;