//library
import React from 'react';
// import produce from 'immer';
import {
  // Dimensions,
  Text,
  View,
} from 'react-native';
// import {TabView, TabBar} from 'react-native-tab-view';
import {SearchBar} from 'react-native-elements';
import memoize from 'memoize-one';
import {connect} from 'react-redux';
import R from 'ramda';
import {createStructuredSelector} from 'reselect';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import styles from './styles';
import {veryLightGrey} from '@styles/colors';
import FormList from '@containers/FormList';
import OfflineFormList from '@containers/OfflineFormList';
import {searchBarStyle} from '@styles/common';
import {activeScreen} from '@store/common';
import {selectSortedFormList, selectOfflineFormList} from '@selector/form';
import {selectNetworkInfo} from '@selector/common';

// const width = Dimensions.get('window').width;
class FormScreen extends NavigationComponent {
  constructor(props) {
    super(props);

    this.state = {
      // index: 0,
      searchKeyword: '',
      // routes: [
      //   {key: 'first', title: 'Online', disable: false},
      //   {key: 'second', title: 'Offline', disable: true},
      // ],
    };

    Navigation.events().bindComponent(this);
  }

  // componentDidMount() {
  //   const isInternetReachable = this.props.networkInfo.isInternetReachable;

  //   if (!isInternetReachable) {
  //     this.updateScreenState(1, 0);
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   const isAvailPrevProps = prevProps.networkInfo.isInternetReachable;
  //   const isAvailThisProps = this.props.networkInfo.isInternetReachable;

  //   if (isAvailPrevProps !== isAvailThisProps) {
  //     if (!isAvailThisProps) {
  //       this.updateScreenState(1, 0);
  //     } else {
  //       this.updateScreenState(0, 1);
  //     }
  //   }
  // }

  // updateScreenState(index, indexDisabled) {
  //   this.setState(
  //     produce((draft) => {
  //       draft.index = index;
  //       draft.routes[indexDisabled].disable = true;
  //       draft.routes[index].disable = false;
  //     }),
  //   );
  // }

  getFilteredFormlist = memoize((forms, keyword) => {
    return R.filter(
      (form) => R.includes(keyword?.toLowerCase(), form?.name?.toLowerCase()),
      forms,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  // renderScene = ({route}) => {
  //   switch (route.key) {
  //     case 'first':
  //       return (
  //         <FormList
  //           searchKeyword={this.state.searchKeyword}
  //           filteredFromList={this.getFilteredFormlist(
  //             this.props.formList,
  //             this.state.searchKeyword,
  //           )}
  //         />
  //       );
  //     case 'second':
  //       return (
  //         <OfflineFormList
  //           searchKeyword={this.state.searchKeyword}
  //           filteredFromList={this.getFilteredFormlist(
  //             this.props.offlineFormList,
  //             this.state.searchKeyword,
  //           )}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // renderTabBar = (prop) => (
  //   <TabBar
  //     {...prop}
  //     activeColor={white}
  //     inactiveColor={lightRed}
  //     renderLabel={({route, color}) => (
  //       <Text style={[styles.tabText, {color}]}>{route.title}</Text>
  //     )}
  //     onTabPress={({route, preventDefault}) => {
  //       if (route.key === 'first' && route.disable) {
  //         preventDefault();
  //       }
  //       if (route.key === 'second' && route.disable) {
  //         preventDefault();
  //       }
  //     }}
  //     indicatorStyle={{opacity: 0}}
  //     style={styles.tabBar}
  //     tabStyle={styles.tab}
  //   />
  // );

  render() {
    const {searchKeyword} = this.state;
    const {networkInfo} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <SearchBar
            placeholder="Search form"
            containerStyle={searchBarStyle.searchContainer}
            inputContainerStyle={searchBarStyle.searchInputContainer}
            inputStyle={searchBarStyle.searchInput}
            searchIcon={{
              color: veryLightGrey,
            }}
            selectionColor={veryLightGrey}
            placeholderTextColor={veryLightGrey}
            value={searchKeyword}
            onChangeText={this.handleOnChangeText}
            clearIcon={{
              color: veryLightGrey,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.subHeader}>
            <Text style={styles.subHederText}>
              {networkInfo.isInternetReachable ? 'Online' : 'Offline'}
            </Text>
          </View>
          {networkInfo.isInternetReachable ? (
            <FormList
              searchKeyword={this.state.searchKeyword}
              filteredFromList={this.getFilteredFormlist(
                this.props.formList,
                this.state.searchKeyword,
              )}
            />
          ) : (
            <OfflineFormList
              searchKeyword={this.state.searchKeyword}
              filteredFromList={this.getFilteredFormlist(
                this.props.offlineFormList,
                this.state.searchKeyword,
              )}
            />
          )}
        </View>
        {/* <TabView
          navigationState={{index, routes, disable}}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          swipeEnabled={false}
          onIndexChange={(idx) => this.setState({index: idx})}
          initialLayout={{width}}
          sceneContainerStyle={styles.container}
        /> */}
      </View>
    );
  }
}

// FormScreen.options = () => {
//   return {
//     topBar: {
//       rightButtons: [
//         {
//           id: screens.SyncButton,
//           component: {
//             name: screens.SyncButton,
//           },
//         },
//       ],
//     },
//   };
// };

const mapState = createStructuredSelector({
  formList: selectSortedFormList,
  offlineFormList: selectOfflineFormList,
  networkInfo: selectNetworkInfo,
});

export default connect(mapState, {activeScreen})(FormScreen);
