//library
import React from 'react';
import {useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import styles from './styles';
import {red, white} from '@styles/colors';
import FormList from '@containers/FormList';
import OfflineFormList from '@containers/OfflineFormList';
import {lightRed} from '../../styles/colors';

const renderScene = SceneMap({
  first: FormList,
  second: OfflineFormList,
});

const FormScreen = (props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Online'},
    {key: 'second', title: 'Offline'},
  ]);

  const renderTabBar = (prop) => (
    <TabBar
      {...prop}
      activeColor={white}
      inactiveColor={lightRed}
      // renderIcon={({route, color}) => (
      //   <Icon
      //     name={route.title === 'Online' ? 'file-upload' : 'file-download'}
      //     color={color}
      //     size={16}
      //     style={{marginRight: 5, bottom: 2}}
      //   />
      // )}
      renderLabel={({route, color}) => (
        <Text style={[styles.tabText, {color}]}>{route.title}</Text>
      )}
      indicatorStyle={{backgroundColor: red}}
      style={{backgroundColor: red}}
      tabStyle={styles.tab}
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

FormScreen.options = {
  topBar: {
    title: {
      text: 'Forms',
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

export default FormScreen;
