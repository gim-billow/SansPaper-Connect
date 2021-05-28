import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {red, white} from '@styles/colors';
import OfflineFormList from '@containers/OfflineFormList';
import Outbox from '@containers/Outbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: OfflineFormList,
  second: Outbox,
});

const OfflineFormScreen = (props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Forms'},
    {key: 'second', title: 'Outbox'},
  ]);

  const renderTabBar = (prop) => (
    <TabBar
      {...prop}
      activeColor={red}
      inactiveColor="#000"
      renderIcon={({route, color}) => (
        <Icon
          name={route.title === 'Forms' ? 'clipboard' : 'envelope'}
          color={color}
          size={16}
          style={{marginRight: 5, bottom: 2}}
        />
      )}
      indicatorStyle={{backgroundColor: red}}
      style={{backgroundColor: white}}
      tabStyle={{
        flexDirection: 'row',
      }}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      sceneContainerStyle={styles.container}
    />
  );
};

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
