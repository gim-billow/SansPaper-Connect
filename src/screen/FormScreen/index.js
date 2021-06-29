//library
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {SearchBar} from 'react-native-elements';
import memoize from 'memoize-one';
import {connect} from 'react-redux';
import R from 'ramda';
import {createStructuredSelector} from 'reselect';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import styles from './styles';
import {white, veryLightGrey, lightRed} from '@styles/colors';
import FormList from '@containers/FormList';
import OfflineFormList from '@containers/OfflineFormList';
import {searchBarStyle} from '@styles/common';
import {activeScreen} from '@store/common';
import {selectSortedFormList, selectOfflineFormList} from '@selector/form';

const width = Dimensions.get('window').width;
class FormScreen extends NavigationComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      searchKeyword: '',
      routes: [
        {key: 'first', title: 'Online'},
        {key: 'second', title: 'Offline'},
      ],
    };

    Navigation.events().bindComponent(this);
  }

  getFilteredFormlist = memoize((forms, keyword) => {
    return R.filter(
      (form) => R.includes(keyword?.toLowerCase(), form?.name?.toLowerCase()),
      forms,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <FormList
            searchKeyword={this.state.searchKeyword}
            filteredFromList={this.getFilteredFormlist(
              this.props.formList,
              this.state.searchKeyword,
            )}
          />
        );
      case 'second':
        return (
          <OfflineFormList
            searchKeyword={this.state.searchKeyword}
            filteredFromList={this.getFilteredFormlist(
              this.props.offlineFormList,
              this.state.searchKeyword,
            )}
          />
        );
      default:
        return null;
    }
  };

  renderTabBar = (prop) => (
    <TabBar
      {...prop}
      activeColor={white}
      inactiveColor={lightRed}
      renderLabel={({route, color}) => (
        <Text style={[styles.tabText, {color}]}>{route.title}</Text>
      )}
      indicatorStyle={{opacity: 0}}
      style={styles.tabBar}
      tabStyle={styles.tab}
    />
  );

  render() {
    const {index, routes, searchKeyword} = this.state;

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
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={(idx) => this.setState({index: idx})}
          initialLayout={{width}}
          sceneContainerStyle={styles.container}
        />
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
});

export default connect(mapState, {activeScreen})(FormScreen);
