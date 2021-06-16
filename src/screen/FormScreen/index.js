//library
import React from 'react';
import {useWindowDimensions} from 'react-native';
// import {connect} from 'react-redux';
// import {createStructuredSelector} from 'reselect';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import {red, white} from '@styles/colors';
import FormList from '@containers/FormList';
import OfflineFormList from '@containers/OfflineFormList';

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
      activeColor={red}
      inactiveColor="#000"
      renderIcon={({route, color}) => (
        <Icon
          name={route.title === 'Online' ? 'file-upload' : 'file-download'}
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

FormScreen.options = {
  topBar: {
    title: {
      text: 'Form',
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

// class FormScreen extends React.Component {
//   static options = () => {
//     const option = {
//       topBar: {
//         visible: false,
//         title: {
//           text: 'Forms',
//         },
//       },
//       statusBar: {
//         visible: true,
//         backgroundColor: red,
//         styles: 'light',
//       },
//     };
//     return option;
//   };

//   render() {
//     const {netInfo} = this.props;

//     return (
//       <View style={styles.container}>
//         {netInfo.isInternetReachable ? <FormList /> : <NoInternet />}
//       </View>
//     );
//   }
// }

// const mapState = createStructuredSelector({
//   netInfo: selectNetworkInfo,
// });

// export default connect(mapState, null)(FormScreen);
